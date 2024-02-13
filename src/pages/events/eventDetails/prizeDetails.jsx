import React from "react";

const PrizeDetails = ({ event }) => {
  console.log(event);
  const tableStyles = {
    width: "100%",
    backgroundColor: "#f8f9fa",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    marginTop: "40px",
  };
  return (
    <div>
      <table className="table table-border" style={tableStyles}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Prize(Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {event && (
            <>
              <tr>
                <td>First Prize</td>
                <td>{event.firstPrizeMoney}</td>
              </tr>
              <tr>
                <td>Second Prize (Runner-Up)</td>
                <td>{event.secondPrizeMoney}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrizeDetails;
