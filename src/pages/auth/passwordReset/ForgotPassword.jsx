import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Input, Typography } from "@material-tailwind/react";
import Info from "../../../components/alerts/Info";
import Success from "../../../components/alerts/Success";
import { MdAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

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
        <div className="max-w-2xl">
          <Info>
            Password reset links will not be sent automatically. Please contact
            us after submitting this form
          </Info>
        </div>
        <div>
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="my-3 max-w-2xl">
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
              <div className="my-3 max-w-2xl">
                <Success>
                  <div>
                    <p>
                      Your password reset was raised. Please contact us to get
                      the password reset link
                    </p>
                  </div>
                  <p>
                    <a
                      href={`https://wa.me/+919443389893?text=${whatsappMsg}`}
                      className="underline"
                    >
                      <div className="flex items-center text-lg gap-1">
                        <FaWhatsapp />
                        <div>WhatsApp us</div>
                      </div>
                    </a>
                    &nbsp;or&nbsp;
                    <a
                      href="mailto:pragadeshbs+samhita-reset-password@pm.me"
                      className="underline"
                    >
                      <div className="flex items-center text-lg gap-1">
                        <MdAlternateEmail />
                        <div>Email us</div>
                      </div>
                    </a>
                  </p>
                </Success>
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
