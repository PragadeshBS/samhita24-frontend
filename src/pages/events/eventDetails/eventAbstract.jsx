import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnregisterConfirmationModal from "../../../components/modals/UnregisterConfirmationModal";
import { Rating } from "react-simple-star-rating";
import { Store } from "react-notifications-component";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";
import Loading from "../../loader/loading.svg";

const EventAbstract = ({
  register,
  registered,
  user,
  event,
  isOrganiser,
  unregister,
  regLoading,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const tooltipArray = ["Terrible", "Bad", "Average", "Great", "Awesome"];

  const handlerating = (rVal) => {
    setRating(rVal);
    axios
      .post(
        `/api/ratings/${event._id}`,
        { ratingVal: rVal / 20 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Store.addNotification({
          title: "Success!",
          message: "Your rating was added successfully",
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
          message: err.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true,
          },
        });
      });
  };

  useEffect(() => {
    if (registered && new Date(event.eventEndDate) < new Date()) {
      axios
        .get(`/api/ratings/${event._id}`, {
          headers: { Authorization: `Bearer: ${token}` },
        })
        .then((res) => {
          setRating(res.data.ratingVal * 20);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [event._id, token, event.eventEndDate, registered]);

  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <h1 className="display-5 mt-5">Events</h1>
        <div className="row mt-5 mb-5">
          <div className="col d-flex justify-content-center">
            <img src={Loading} alt="..." />
          </div>
        </div>
      </div>
    );
  }

  if (regLoading) {
    return (
      <div className="alert mx-auto alert-secondary text-center">
        Making changes...
      </div>
    );
  }

  if (isOrganiser) {
    return (
      <div>
        <button
          onClick={() => navigate(`/view-registrations/${event._id}`)}
          className="btn btn-success m-3"
        >
          View registrations
        </button>
        <button
          onClick={() => navigate(`/events/update/${event._id}`)}
          className="btn btn-secondary m-3"
        >
          Update event Info
        </button>
      </div>
    );
  }
  if (new Date(event.eventEndDate) < new Date()) {
    // event has ended
    if (registered) {
      return (
        <div>
          <div className="my-2">
            <h6 className="display-6">Rate this event</h6>
          </div>
          <Rating
            onClick={handlerating}
            ratingValue={rating}
            size={35}
            transition
            showTooltip
            tooltipArray={tooltipArray}
          />
        </div>
      );
    } else {
      return (
        <div className="alert alert-secondary text-center">
          This event has ended
        </div>
      );
    }
  } else {
    // event has not ended || registrations open
    if (user) {
      if (registered) {
        // user has registered
        return (
          <div>
            <div className="alert mx-auto alert-success text-center">
              You have registered for this event!
            </div>
            <div className="text-danger mx-auto text-center cursor-pointer">
              <span
                onClick={() => setShowConfirmationModal(true)}
                style={{ cursor: "pointer" }}
              >
                Unregister
              </span>
            </div>
            <UnregisterConfirmationModal
              isOpen={showConfirmationModal}
              close={() => setShowConfirmationModal(false)}
              unregister={unregister}
            />
          </div>
        );
      } else {
        // user has not registered
        return (
          <button
            onClick={register}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Register Now
          </button>
        );
      }
    } else {
      // no user
      return (
        <span
          className="alert alert-secondary w-50 text-center mx-auto d-block"
          onClick={() => navigate(`/login?flow=eventdetails/${event._id}`)}
          style={{ cursor: "pointer" }}
        >
          Login to register
        </span>
      );
    }
  }
};

export default EventAbstract;
