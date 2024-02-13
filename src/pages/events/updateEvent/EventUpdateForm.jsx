import Header from "../../../components/events/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "react-autocomplete-input/dist/bundle.css";
import EventDetailsForm from "../../../components/events/EventDetailsForm";
import Loading from "../../loader/loading.svg";

const UpdateEvent = () => {
  const { id } = useParams();

  const { user, token } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [imageModified, setImageModified] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const [checkingConflicts, setCheckingConflicts] = useState(false);
  const [conflictsExist, setConflictsExist] = useState(false);
  const [showConflictingEvents, setShowConflictingEvents] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [organizers, setOrganizers] = useState([]);

  const updateEvent = () => {
    if (formData.eventStartDate > formData.eventEndDate) {
      setError("Start time has to be lesser than end time");
      setSuccess("");
      return;
    } else {
      setError("");
    }
    if (!showSubmitBtn) {
      setCheckingConflicts(true);
      axios
        .post(
          "/api/events/check-conflicts/",
          {
            from: formData.eventStartDate,
            to: formData.eventEndDate,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setCheckingConflicts(false);
          if (res.data.conflict) {
            setConflictsExist(true);
            setConflictingEvents(res.data.events);
          } else {
            setShowSubmitBtn(true);
          }
        });
    } else {
      const uploadImage = () => {
        if (selectedImage && selectedImage.size > 5000000) {
          setError("Image size must be less than 5 MB");
          setSuccess("");
          return;
        }
        setUploading(true);
        setSuccess("");
        setError("");
        const formData = new FormData();
        formData.append("img", selectedImage);
        axios
          .post("/api/events/image", formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUploading(false);
            setSuccess("Image uploaded successfully, updating event...");
            submitEventForm(res.data._id);
          })
          .catch((err) => {
            setError(err.message);
            setUploading(false);
          });
      };

      const submitEventForm = (imgId) => {
        const dataToSend = {
          eventName: formData.eventName,
          eventStartDate: formData.eventStartDate,
          eventEndDate: formData.eventEndDate,
          eventType: formData.eventType,
          firstPrizeMoney: formData.firstPrizeMoney,
          secondPrizeMoney: formData.secondPrizeMoney,
          venue: formData.venue,
          dept: formData.dept,
          contactName: formData.contactName,
          contactPhone: formData.contactPhone,
          contactEmail: formData.contactEmail,
          link: formData.link,
          otherInfo: formData.otherInfo,
          public: formData.public,
          whatsapp: formData.whatsapp,
        };
        if (imageModified) {
          if (selectedImage) {
            dataToSend["image"] = imgId;
          } else {
            dataToSend["image"] = "";
          }
        }
        axios
          .patch(`/api/events/${id}`, dataToSend, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setError("");
            setSuccess("Event updated successfully");
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      };

      if (imageModified && selectedImage) {
        uploadImage();
      } else {
        submitEventForm(existingImage);
      }
    }
  };

  useEffect(() => {
    axios.get(`/api/events/${id}`).then((response) => {
      setFormData({
        ...response.data,
        eventStartDate: response.data.eventStartDate.substr(0, 16),
        eventEndDate: response.data.eventEndDate.substr(0, 16),
      });
      if (response.data.image) {
        setExistingImage(`/api/events/image/${response.data._id}`);
      }
      axios.get(`/api/events/organizers/${id}`).then((res) => {
        let isOrg = false;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === user) {
            isOrg = true;
            break;
          }
        }
        if (!isOrg) {
          navigate("/");
        }
        setOrganizers(res.data);
        setLoading(false);
      });
    });
  }, [id, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent();
  };

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

  return (
    <div className="container row mx-auto">
      <Header title={"Update event"} />
      <EventDetailsForm
        formData={formData}
        setFormData={setFormData}
        error={error}
        existingImage={existingImage}
        setExistingImage={setExistingImage}
        setSelectedImage={setSelectedImage}
        uploading={uploading}
        success={success}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        checkingConflicts={checkingConflicts}
        conflictsExist={conflictsExist}
        setConflictsExist={setConflictsExist}
        show
        showConflictingEvents={showConflictingEvents}
        setShowConflictingEvents={setShowConflictingEvents}
        conflictingEvents={conflictingEvents}
        handleSubmit={handleSubmit}
        showSubmitBtn={showSubmitBtn}
        setShowSubmitBtn={setShowSubmitBtn}
        selectedImage={selectedImage}
        setImageModified={setImageModified}
        showOrganizerForm={true}
        organizers={organizers}
        setOrganizers={setOrganizers}
        id={id}
      />
    </div>
  );
};
export default UpdateEvent;
