import Header from "../../../components/events/Header";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "react-autocomplete-input/dist/bundle.css";
import EventDetailsForm from "../../../components/events/EventDetailsForm";

const EventCreationForm = () => {
  const { token } = useAuthContext();
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    eventName: "",
    eventStartDate: "",
    eventEndDate: "",
    venue: "",
    dept: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    eventType: "Technical",
    firstPrizeMoney: "",
    secondPrizeMoney: "",
    link: "",
    otherInfo: "",
    public: true,
    whatsapp: true,
  });
  const [suggestions, setSuggestions] = useState([]);

  const [checkingConflicts, setCheckingConflicts] = useState(false);
  const [conflictsExist, setConflictsExist] = useState(false);
  const [showConflictingEvents, setShowConflictingEvents] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  const addEvent = () => {
    if (selectedImage && selectedImage.size > 5000000) {
      setError("Image size must be less than 5 MB");
      setSuccess("");
      return;
    }
    if (formData.eventStartDate > formData.eventEndDate) {
      setError("Start time has to be lesser than end time");
      setSuccess("");
      return;
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
      const submitEventForm = (imgId) => {
        axios
          .post(
            "/api/events",
            { ...formData, image: imgId },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => {
            setError("");
            setSuccess("Event created successfully");
            setFormData({
              eventName: "",
              eventStartDate: "",
              eventEndDate: "",
              venue: "",
              dept: "",
              contactName: "",
              contactPhone: "",
              contactEmail: "",
              eventType: "Technical",
              firstPrizeMoney: "",
              secondPrizeMoney: "",
              link: "",
              otherInfo: "",
              public: true,
              whatsapp: true,
            });
          })
          .catch((err) => {
            setError(err.response.data.error + "hello");
          });
      };

      const uploadImage = () => {
        setUploading(true);
        setSuccess("");
        setError("");
        const formData = new FormData();
        formData.append("img", selectedImage);
        axios
          .post("api/events/image", formData)
          .then((res) => {
            setUploading(false);
            setSuccess("Image uploaded successfully, creating event...");
            submitEventForm(res.data._id);
          })
          .catch((err) => {
            setError(err.message);
            setUploading(false);
          });
      };
      if (selectedImage) {
        uploadImage();
      } else {
        submitEventForm();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  return (
    <div className="EventCreationPage container">
      <div className="container row">
        <Header title={"Create an Event"} />
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
          setImageModified={() => {}}
          showOrganizerForm={false}
        />
      </div>
    </div>
  );
};
export default EventCreationForm;
