import { format } from "date-fns";
import { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

const EventInformation = (props) => {
  const [link, setLink] = useState(props.detail.link);
  const tableStyles = {
    width: "100%",
    backgroundColor: "#f8f9fa",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    marginTop: "20px",
  };
  if (link && !link.startsWith("http")) setLink("https://" + link);
  return (
    <div>
      <h1 className="display-4">Event Particulars</h1>
      <table className="table table-border" style={tableStyles}>
        <tbody>
          <tr>
            <td>Event Dates</td>
            <td>
              {format(
                new Date(props.detail.eventStartDate),
                "dd MMM yyyy h:mm a"
              )}{" "}
              -{" "}
              {format(
                new Date(props.detail.eventEndDate),
                "dd MMM yyyy h:mm a"
              )}
            </td>
          </tr>
          <tr>
            <td>Event type</td>
            <td>{props.detail.eventType}</td>
          </tr>
          <tr>
            <td>Organisers</td>
            <td>
              <ul className="list-unstyled">
                {props.detail.organisers.map((org) => (
                  <li key={org._id}>
                    <strong>{org.userName}</strong> ({org.regNo})
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Venue</td>
            <td>
              <strong>{props.detail.venue}</strong>
            </td>
          </tr>
          <tr>
            <td>Contact Name</td>
            <td>{props.detail.contactName}</td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td>
              <ReactWhatsapp
                number={props.detail.contactPhone}
                style={{
                  border: "none",
                  backgroundColor: "inherit",
                  color: `${props.detail.whatsapp ? "green" : "inherit"}`,
                }}
                message="get ready"
              >
                {props.detail.whatsapp && <FaWhatsapp className="me-1 fs-4" />}
                {props.detail.contactPhone}
              </ReactWhatsapp>
            </td>
          </tr>
          <tr>
            <td>Contact Email</td>
            <td>
              <a href={`mailto:${props.detail.contactEmail}`}>
                <MdEmail className="me-1 fs-4" />
                {props.detail.contactEmail}
              </a>
            </td>
          </tr>
          {link && (
            <tr>
              <td>Link</td>
              <td>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "darkblue" }}
                >
                  <CgWebsite className="me-1 fs-4" />
                  {link}
                </a>
              </td>
            </tr>
          )}
          <tr>
            <td>Other Info</td>
            <td>{props.detail.otherInfo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventInformation;
