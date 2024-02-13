import Modal from "react-modal";
import { format } from "date-fns";

Modal.setAppElement("#root");

const EventConflictModal = ({ events, isOpen, close }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    close();
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ display: "flex", alignItems: "start", gap: "2rem" }}>
          <span className="display-6">Possible conflicting events</span>
          <button
            type="button"
            className="me-1 ms-auto btn btn-sm btn-outline-danger"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Event name</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Venue</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map((event, idx) => {
                return (
                  <tr key={event._id}>
                    <td>{idx + 1}</td>
                    <td>{event.eventName}</td>
                    <td>
                      {format(
                        new Date(event.eventStartDate.substr(0, 16)),
                        "dd MMM yyyy\th:mm a"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(event.eventEndDate.substr(0, 16)),
                        "dd MMM yyyy\th:mm a"
                      )}
                    </td>
                    <td>{event.venue}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
export default EventConflictModal;
