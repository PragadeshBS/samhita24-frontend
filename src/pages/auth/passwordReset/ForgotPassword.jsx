import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Input, Typography } from "@material-tailwind/react";
import Info from "../../../components/alerts/Info";
import ReactWhatsapp from "react-whatsapp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/forgot-password", {
        email,
      })
      .then(() => {
        setWhatsappMsg(
          `Hi! This is ${email}. I have raised a request to reset my password. Please send my password reset link.`
        );
        setShowMsg(true);
        setEmail("");
      });
  };
  return (
    <div className="container mx-auto">
      <div className="page-view">
        <Typography variant="h1" className="mb-3">
          Forgot Password
        </Typography>
        <div>
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="my-3 max-w-xl">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                color="white"
                required={true}
              />
            </div>
            <div className="my-3">
              <Button
                type="submit"
                className="bg-primaryLight rounded-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset Password"}
              </Button>
            </div>
            {showMsg && (
              <div className="my-3 max-w-xl">
                <Info>
                  <div>
                    <p>
                      Your password reset was raised. Please contact us to get
                      the password reset link
                    </p>
                  </div>
                </Info>
                <p className="text-center">
                  <a
                    href="mailto:pragadeshbs+samhita-reset-password@pm.me"
                    className="underline"
                  >
                    <span>Email us</span>
                  </a>
                  &nbsp;or&nbsp;
                  <a
                    href={`https://wa.me/+919443389893?text=${whatsappMsg}`}
                    className="underline"
                  >
                    WhatsApp us
                  </a>
                </p>
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
  );
};
export default ForgotPassword;
