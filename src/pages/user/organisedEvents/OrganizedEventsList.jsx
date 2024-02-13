import { format } from "date-fns";
import { Link } from "react-router-dom";
import image1 from "../../../images/e1.png";
import config from "../../../config";

const OrganizedEventsList = ({ events }) => {
  return (
    <div className="row">
      {events &&
        events.map((event) => {
          return (
            <div
              className="card m-5 p-1 col-1 mx-auto"
              style={{ width: "18rem" }}
              key={event._id}
            >
              <img
                src={
                  event.image
                    ? `${config}/api/events/image/${event._id}`
                    : image1
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {format(
                    new Date(event.eventStartDate.substr(0, 16)),
                    "dd MMM yyyy-h:mm a"
                  )}
                </h6>
                <p className="card-text">Venue: {event.venue}</p>
                <Link to={`/eventdetails/${event._id}`}>
                  <button className="btn btn-success">View Event</button>
                </Link>
                <Link to={`/events/update/${event._id}`}>
                  <button className="btn btn-secondary m-1">
                    Update Event
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default OrganizedEventsList;
