import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Store } from "react-notifications-component";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../modals/ConfirmationModal";

const EventOrganisersForm = ({ organizers, setOrganizers, id }) => {
  const { user, token } = useAuthContext();
  const [organizerRegNo, setOrganizerRegNo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `/api/events/organizers/${id}`,
        { organizerRegNo },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setOrganizers([...organizers, res.data]);
        Store.addNotification({
          title: "Success!",
          message: `${res.data.userName} is now an organiser for this event`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true,
          },
        });
      })
      .catch((err) => {
        Store.addNotification({
          title: "Error!",
          message: err.response.data.error,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };
  const showRemoveModal = (userId) => {
    for (let index = 0; index < organizers.length; index++) {
      if (organizers[index]._id === userId) {
        setUserName(organizers[index].userName);
        setUserIdToDelete(organizers[index]._id);
        setShowModal(true);
        break;
      }
    }
  };
  const removeUser = () => {
    axios
      .delete(`/api/events/organizers/${id}/${userIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrganizers(organizers.filter((org) => org._id !== userIdToDelete));
        Store.addNotification({
          title: "Removed!",
          message: `${res.data.userName} is no longer an organiser for this event`,
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true,
          },
        });
      })
      .catch(() => {
        Store.addNotification({
          title: "Error!",
          message: "Something went wrong",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };
  return (
    <div className="my-3">
      <div className="shadow py-4 px-5 rounded col-lg-8">
        <h3>Event Organisers</h3>
        <p className="text-muted">
          Organisers are people other than you who can update information about
          the event and view participants' information
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Organiser's register number"
              className="form-control"
              value={organizerRegNo}
              onChange={(e) => {
                setOrganizerRegNo(e.target.value);
              }}
              required={true}
            />
            <button className="btn btn-success my-3">Add organiser</button>
          </form>
        </div>
        <h6>Organisers for this event:</h6>
        <ul className="list-group list-group-flush">
          {organizers.length > 0 &&
            organizers.map((org) => {
              return (
                <li key={org._id} className="list-group-item">
                  {org.userName}
                  {org.email === user && (
                    <span className="text-muted small"> (Yourself)</span>
                  )}
                  , {org.regNo}, {org.dept}
                  {org.email !== user && (
                    <MdDelete
                      onClick={() => showRemoveModal(org._id)}
                      className="text-danger ms-3"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </li>
              );
            })}
          {organizers.length === 0 && (
            <div className="text-muted">
              You're the only organizer for this event yet
            </div>
          )}
        </ul>
      </div>
      <ConfirmationModal
        isOpen={showModal}
        title="Remove participant"
        text={`Are you sure want to remove ${userName} from being an organizer for this event`}
        confirm={removeUser}
        close={() => setShowModal(false)}
      />
    </div>
  );
};
export default EventOrganisersForm;
