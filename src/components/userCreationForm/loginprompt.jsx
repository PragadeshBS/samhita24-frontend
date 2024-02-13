import { Link } from "react-router-dom";
import "./loginprompt.css";
const LoginPrompt = () => {
  return (
    <div className="login-prompt container row">
      <div className="col display-6">
        <p>Already a member Sign in</p>
      </div>
      <div>
        <button className="btn btn-primary my-2 ms-1 btn-lg">
          <Link to="/login"></Link>Login
        </button>
      </div>
    </div>
  );
};
export default LoginPrompt;
