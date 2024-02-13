const Header = (props) => {
  return (
    <div className="header ">
      <span className="display-3 my-4  d-block">{props.title}</span>
    </div>
  );
};
export default Header;
