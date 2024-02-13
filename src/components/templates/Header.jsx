import "./templateStyles.css";

const Header = () => {
  return (
    <div>
      <div className="container my-2">
        <div className="top">
          <div>
            <img
              src="/static/images/app/mitLogo.png"
              alt="mit-logo"
              className="logo-img"
            />
          </div>
          <div className="ms-3 title">
            <span className="h1 text-center title-text">MUTEX '23</span>
            <span className="h5 text-center subtitle-text">
              An Epic Symposium
            </span>
            <span>Department of Information Technology</span>
          </div>
          <div>
            <img
              src="/static/images/app/auLogo.png"
              alt="annauniv-logo"
              className="logo-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
