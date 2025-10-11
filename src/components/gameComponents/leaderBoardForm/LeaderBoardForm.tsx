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
    const body: object = formData;
    console.log(formData);
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
    <form className={styles.leaderBoardForm} onSubmit={handleSubmitScore} data-testid="leaderboard-form">
      <h2 aria-label="Submit Your Score">Submit Your Score</h2>
      <label htmlFor="playerName" aria-label="Player Name">
        Name:{" "}
      </label>
      <input id="playerName" type="text" name="playerName" required/>
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
        onClick={handleCancelForm}
        type="button"
        aria-label="Cancel button"
      >
        Cancel
      </button>
    </form>
  );
}

export default LeaderBoardForm;
