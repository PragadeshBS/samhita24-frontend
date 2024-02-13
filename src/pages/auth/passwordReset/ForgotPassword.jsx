import Header from "../../../components/events/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/forgot-password", {
        email,
      })
      .then(() => {
        setShowMsg(true);
        setEmail("");
      });
  };
  return (
    <div className="EventCreationPage container row mx-auto pb-5">
      <Header title={"Reset password"} />
      <div className="row">
        <div className="mx-auto col-lg-8">
          <div className="EventCreationForm py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="form-control mx-auto m-3 "
                  required={true}
                ></input>
              </div>
              <div className="form-group  text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Done
                </button>
              </div>
              {showMsg && (
                <div className="my-2 alert alert-success">
                  Check your email for further instructions
                </div>
              )}
              <div>
                <Link to="/login">
                  <span className="text-muted small">Back to login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
