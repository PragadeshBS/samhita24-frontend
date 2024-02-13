import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user, token } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Events
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {admin && (
              <li className="nav-item">
                <Link className="nav-link active" to="/archives">
                  Archives
                </Link>
              </li>
            )}
            {admin && (
              <li className="nav-item">
                <Link className="nav-link active" to="/eventcreationform">
                  Create Event
                </Link>
              </li>
            )}
          </ul>
          {!user && (
            <>
              <div className="m-2">
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline-primary"
                >
                  Login
                </button>
              </div>
              <div className="m-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
          {user && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {user}
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My profile
                    </Link>
                  </li>
                  {admin && (
                    <li>
                      <Link className="dropdown-item" to="/organised-events">
                        Organised events
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/participated-events">
                      Participated events
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          <form className="d-flex" role="search">
            <SearchBar />
          </form>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
