const CustomProgressBar = ({ completed }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${completed}%` }}
      ></div>
    </div>
  );
};
export default CustomProgressBar;
