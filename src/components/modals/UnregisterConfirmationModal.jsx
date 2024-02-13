import Modal from "react-modal";

Modal.setAppElement("#root");

const UnregisterConfirmationModal = ({ isOpen, close, unregister }) => {
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
        <div className="p-3">
          <div style={{ display: "flex", alignItems: "start", gap: "2rem" }}>
            <span className="display-6">Confirm unregister</span>
          </div>
          <div className="p-3">Are you sure want to unregister?</div>
          <div className="container">
            <span className="mx-3">
              <button
                onClick={() => {
                  unregister();
                  close();
                }}
                className="btn btn-sm btn-outline-danger"
              >
                Unregister
              </button>
            </span>
            <span className="mx-3">
              <button onClick={() => close()} className="btn btn-success">
                No
              </button>
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UnregisterConfirmationModal;
