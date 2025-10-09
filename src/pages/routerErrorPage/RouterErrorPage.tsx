import { Link } from "react-router-dom";

const RouterErrorPage = () => {
  return (
    <div>
      <h1 aria-label="Error Heading: Oh no, this route doesn't exist!">
        Oh no, this route doesn't exist!
      </h1>
      <Link
        to="/"
        aria-label="Home Page Link: Go back to the home page by clicking here"
      >
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default RouterErrorPage;
