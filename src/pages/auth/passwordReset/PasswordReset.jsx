import { useState } from "react";
import Header from "../../../components/events/Header";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  if (!token) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    axios
      .post("/api/auth/reset-password", { token, password })
      .then((res) => {
        setError("");
        setSuccess("Your password has been reset");
      })
      .catch((err) => {
        setSuccess("");
        setError(err.response.data.error);
      });
  };
  return (
    <div className="EventCreationPage container row mx-auto pb-5">
      <Header title={"Reset password"} />
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="EventCreationForm py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control m-3"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control m-3"
                ></input>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
