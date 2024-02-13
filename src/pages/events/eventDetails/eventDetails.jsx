import image1 from "../../../images/e1.png";
import "./eventDetail.css";
import EventAbstract from "./eventAbstract";
import EventInformation from "./eventInformation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../loader/loading.svg";
import { useAuthContext } from "../../../hooks/useAuthContext";
import PrizeDetails from "./prizeDetails";
import config from "../../../config";

const EventDetail = () => {
  const { user, token } = useAuthContext();
  const [isOrganiser, setIsOrganiser] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);

  const [classname, setClassname] = useState("hide");
  const [loadclass, setLoadClass] = useState("view");

  const register = () => {
    setRegistrationLoading(true);
    axios
      .post(
        `/api/events/participants/${data._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setRegistered(true);
        setRegistrationLoading(false);
      });
  };

  const unregister = () => {
    setRegistrationLoading(true);
    axios
      .delete(`/api/events/participants/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRegistered(false);
        setRegistrationLoading(false);
      });
  };

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(`/api/events/${id}`).then((response) => {
        setData({
          ...response.data,
          eventStartDate: response.data.eventStartDate.substr(0, 16),
          eventEndDate: response.data.eventEndDate.substr(0, 16),
        });
        // check if current user is an organizer
        response.data.organisers.forEach((organiser) => {
          if (organiser.email === user) {
            setIsOrganiser(true);
            return;
          }
        });
        // check if current user is a participant
        response.data.participants.forEach((participant) => {
          if (participant.email === user) {
            setRegistered(true);
            return;
          }
        });
        setLoading(false);
      });
    };
    fetchDetail();
  }, [id, user]);

  if (loading) {
    return (
      <div className="container row d-block mx-auto">
        <h1 className="display-5 mt-5">Events</h1>
        <div className="row mt-5 mb-5">
          <div className="col d-flex justify-content-center">
            <img src={Loading} alt="..." />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container row mx-auto">
      <div className="mt-4">
        <h1 className="display-3">{data.eventName}</h1>
      </div>
      <div className="mt-5 mb-5 pb-3">
        <section className="eventDetail">
          <img
            src={
              data.image
                ? `${config.apiUrl}/api/events/image/${data._id}`
                : image1
            }
            className={`card-img-top d-block mx-auto m-3 ${classname}`}
            alt="..."
            style={{
              maxWidth: "400px",
              borderRadius: "5px",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
            onLoad={() => {
              setClassname("view");
              setLoadClass("hide");
            }}
          />
          <img src={Loading} alt="..." className={`mx-auto ${loadclass}`} />
        </section>

        <div>{window.location.pathname}</div>
        <div className="row mt-5">
          <div className="col-lg-7">
            <EventInformation detail={data} />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-4">
            <EventAbstract
              event={data}
              isOrganiser={isOrganiser}
              user={user}
              registered={registered}
              register={register}
              unregister={unregister}
              regLoading={registrationLoading}
            />
            <PrizeDetails event={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
