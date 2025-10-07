import styles from "./leaderBoardForm.module.css";
import axios from "axios";
import { useGameContext } from "../game/Game";

interface LeaderBoardFormProps {
  setLeaderBoardFormVisible: (visible: boolean) => void;
}

function LeaderBoardForm({ setLeaderBoardFormVisible }: LeaderBoardFormProps) {
  const {state, dispatch} = useGameContext();

  console.log(state.cardTotal);

  //URLs to POST game data to each difficulty database table.
  const easyLeaderBoardUrl =
    "https://memory-game-backend-production-e873.up.railway.app/easy-leader-board/add-easy-top-scorer";
  const mediumLeaderBoardUrl =
    "https://memory-game-backend-production-e873.up.railway.app/medium-leader-board/add-medium-top-scorer";
  const hardLeaderBoardUrl =
    "https://memory-game-backend-production-e873.up.railway.app/hard-leader-board/add-hard-top-scorer";

  //Default URL to easy leader board.
  let leaderBoardPostUrl = easyLeaderBoardUrl;

  // Sets the leaderBoardPostUrl depending on cardTotal when called.
  //If cardTotal is 4 it returns without changing the url.
  function pickUrl() {
    if (state.cardTotal < 9 && state.cardTotal > 5) {
      leaderBoardPostUrl = mediumLeaderBoardUrl;
    }
    if (state.cardTotal === 9) {
      leaderBoardPostUrl = hardLeaderBoardUrl;
    }
    return;
  }

  pickUrl();

  //Create form data object and convert to JSON, then call post function with the JSON data.
  const handleSubmitScore = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataToJson = axios.formToJSON(formData);
    postForm(formDataToJson);
    setLeaderBoardFormVisible(false);
    dispatch({ type: "resetGame", payload: null });
    return;
  };

  //Post form data to the server.
  function postForm(formData: object) {
    const body: object = formData;
    console.log(formData);
    axios
      .post(
        leaderBoardPostUrl,
        body,
        { method: "cors" },
        { withCredentials: true },
      )
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  //Hides form when user clicks cancel.
  const handleCancelForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeaderBoardFormVisible(false);
    dispatch({ type: "resetGame", payload: null });
    return;
  };

  return (
    <form className={styles.leaderBoardForm} onSubmit={handleSubmitScore}>
      <h2 aria-label="Submit Your Score">Submit Your Score</h2>
      <label htmlFor="playerName" aria-label="Player Name">
        Name:{" "}
      </label>
      <input id="playerName" type="text" name="playerName" />
      <label htmlFor="finishTime" aria-label="Finish Time">
        Finish Time:{" "}
      </label>
      <input
        id="finishTime"
        type="string"
        name="finishTime"
        readOnly
        value={state.finalTime}
        aria-label="Your finish time, read only"
      />
      <button type="submit" aria-label="Submit button">
        Submit
      </button>
      <button
        onClick={handleCancelForm as React.MouseEventHandler<HTMLButtonElement>}
        type="button"
        aria-label="Cancel button"
      >
        Cancel
      </button>
    </form>
  );
}


export default LeaderBoardForm;
