import styles from "./leaderBoardForm.module.css";
import axios from "axios";
import { useGameContext } from "../game/useGameContext/useGameContext.ts";
import { postToLeaderBoardUrls } from "./constants/postToLeaderBoardUrls.ts";
import type { MouseEventHandler } from "react";

interface LeaderBoardFormProps {
  setLeaderBoardFormVisible: (visible: boolean) => void;
}

function LeaderBoardForm({ setLeaderBoardFormVisible }: LeaderBoardFormProps) {
  const { state, dispatch } = useGameContext();

  //Pick the correct URL based on the current game difficulty.
  const leaderBoardPostUrl =
    postToLeaderBoardUrls[
      state.gameDifficulty as keyof typeof postToLeaderBoardUrls
    ];

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
    console.log("Posting to leaderboard:", leaderBoardPostUrl);
    const body: object = formData;
    axios
      .post(leaderBoardPostUrl, body, { method: "cors" })
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  //Hide form and reset game state when user clicks cancel.
  const handleCancelForm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setLeaderBoardFormVisible(false);
    dispatch({ type: "resetGame", payload: null });
  };

  return (
    <div className={styles.leaderBoardFormContainer}>
      <form
        className={styles.leaderBoardForm}
        onSubmit={handleSubmitScore}
        data-testid="leaderboard-form"
      >
        <div className={styles.leaderBoardFormTitleContainer}>
          <h2
            aria-label="Submit Your Score"
            className={styles.leaderBoardFormTitle}
          >
            Submit Your Score
          </h2>
        </div>

        <div className={styles.leaderBoardFormInputContainer}>
          <label htmlFor="playerName" aria-label="Player Name">
            Name:{" "}
          </label>
          <input
            id="playerName"
            type="text"
            name="playerName"
            className={styles.leaderBoardFormInput}
            required
          />
          <label htmlFor="finishTime" aria-label="Finish Time">
            Time:{" "}
          </label>
          <input
            id="finishTime"
            type="string"
            name="finishTime"
            readOnly
            value={state.finalTime}
            aria-label="Your finish time, read only"
            className={styles.leaderBoardFormInput}
          />
        </div>

       

        <div className={styles.formButtonsContainer}>
          <button
            type="submit"
            aria-label="Submit button"
            className={styles.leaderBoardFormButton}
          >
            Submit
          </button>
          <button
            onClick={handleCancelForm}
            type="button"
            className={styles.leaderBoardFormButton}
            aria-label="Cancel button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaderBoardForm;
