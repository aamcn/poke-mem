import type { Dispatch, SetStateAction } from "react";
import LeaderBoardControls from "../leaderBoardControls/LeaderBoardControls";
import styles from "./LeaderBoardTable.module.css";
import { capitaliseString } from "../../../modules/capitaliseString";
import LeaderBoardHeader from "../leaderBoardHeader/LeaderBoardHeader";

// Define the structure of a leaderboard entry
interface LeaderBoardEntry {
  id: string;
  player_name: string;
  finish_time: string;
}

// Define the props for LeaderBoardTable
interface LeaderBoardTableProps {
  leaderBoardData: Array<LeaderBoardEntry>;
  setSelectedDifficulty: Dispatch<SetStateAction<string>>;
  selectedDifficulty: string;
}

// Component to display the leaderboard table if no data is available.
function LeaderBoardTable({
  leaderBoardData,
  setSelectedDifficulty,
  selectedDifficulty,
}: LeaderBoardTableProps) {
  if (!leaderBoardData || leaderBoardData.length === 0) {
    return (
      <div>
        <div
          className={styles.leaderBoardContainer}
          data-testid="leaderboard-container"
        >
          <LeaderBoardControls
            setSelectedDifficulty={setSelectedDifficulty}
            selectedDifficulty={selectedDifficulty}
          />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  // Render the leaderboard table with data.
  return (
      <div
        className={styles.leaderBoardContainer}
        data-testid="leaderboard-container"
      >
        <LeaderBoardHeader 
          selectedDifficulty={selectedDifficulty}/>
        <LeaderBoardControls
          setSelectedDifficulty={setSelectedDifficulty}
          selectedDifficulty={selectedDifficulty}
        />
        <div className={styles.tableWrapper}>
          <table
            className={styles.leaderBoardTable}
            aria-label="Leader Board Table"
          >
            <thead className={styles.leaderBoardHeader}>
              <tr className={styles.leaderBoardHeadRow}>
                <th
                  className={styles.leaderBoardCell}
                  aria-label="Leaderboard Position"
                >
                  Position
                </th>
                <th className={styles.leaderBoardCell} aria-label="Player Name">
                  Player Name
                </th>
                <th className={styles.leaderBoardCell} aria-label="Finish Time">
                  Finish Time
                </th>
              </tr>
            </thead>
            <tbody className={styles.leaderBoardBody}>
              {leaderBoardData.map((entry: LeaderBoardEntry, index) => (
                <tr
                  key={entry.id}
                  className={styles.leaderBoardRow}
                  data-testid={`row-${index + 1}`}
                  aria-label={`Row ${index + 1}`}
                >
                  <td
                    className={styles.leaderBoardEntryCell}
                    aria-label={`Leaderboard Position ${index + 1}`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={styles.leaderBoardEntryCell}
                    aria-label={`Player Name ${capitaliseString(
                      entry.player_name,
                    )}`}
                  >
                    {capitaliseString(entry.player_name)}
                  </td>
                  <td
                    className={styles.leaderBoardEntryCell}
                    aria-label={`Finish Time ${entry.finish_time}`}
                  >
                    {entry.finish_time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default LeaderBoardTable;
