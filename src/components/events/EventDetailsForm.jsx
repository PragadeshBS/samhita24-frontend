import EventConflictModal from "../modals/EventConflictModal";
import TextInput from "react-autocomplete-input";
import UploadImage from "./UploadImage";
import EventOrganisersForm from "./EventOrganisersForm";
import { useEffect, useState } from "react";
import CustomProgressBar from "../progressBar/CustomProgressBar";

const EventDetailsForm = ({
  handleSubmit,
  formData,
  setFormData,
  error,
  success,
  existingImage,
  setExistingImage,
  conflictingEvents,
  checkingConflicts,
  conflictsExist,
  showConflictingEvents,
  setShowConflictingEvents,
  suggestions,
  setSuggestions,
  setConflictsExist,
  setSelectedImage,
  uploading,
  showSubmitBtn,
  setShowSubmitBtn,
  selectedImage,
  setImageModified,
  organizers,
  setOrganizers,
  showOrganizerForm,
  id,
}) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let completed = 0;
    if (formData.eventName) completed += 1;
    if (formData.eventStartDate) completed += 1;
    if (formData.eventEndDate) completed += 1;
    if (formData.venue) completed += 1;
    if (formData.dept) completed += 1;
    if (formData.contactName) completed += 1;
    if (formData.contactPhone) completed += 1;
    if (formData.contactEmail) completed += 1;
    if (formData.link) completed += 1;
    if (formData.otherInfo) completed += 1;
    if (formData.eventType) completed += 1;
    setProgress((completed * 100) / 10);
  }, [formData]);
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="my-3 py-4 px-5 border shadow rounded">
          <h3>Event details</h3>
          <span className="text-secondary">Progress</span>
          <CustomProgressBar completed={progress} />
          <form className="pt-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>
                Event Name <span className="text-danger">*</span>
              </label>
              <TextInput
                trigger={["", " "]}
                options={suggestions}
                required={true}
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e })}
                className="create-event-text-input form-control m-3 w-75"
              ></TextInput>
            </div>
            <div className="form-group">
              <label>
                Event Start Time <span className="text-danger">*</span>
              </label>
              <input
                required={true}
                type="datetime-local"
                className="form-control m-3 w-75"
                value={formData.eventStartDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventStartDate: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>
                Event End Time <span className="text-danger">*</span>
              </label>
              <input
                required={true}
                type="datetime-local"
                className="form-control m-3 w-75"
                value={formData.eventEndDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventEndDate: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>
                Venue <span className="text-danger">*</span>
              </label>
              <TextInput
                trigger={["", " "]}
                options={suggestions}
                required={true}
                type="text"
                className="create-event-text-input form-control m-3 w-75"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e })}
              ></TextInput>
            </div>
            <div className="form-group">
              <label>
                Department <span className="text-danger">*</span>
              </label>
              <select
                value={formData.dept}
                onChange={(e) =>
                  setFormData({ ...formData, dept: e.target.value })
                }
                required={true}
                className="form-select w-75 m-3"
              >
                <option value="">Choose the Department</option>
                <option value="AM">Automobile Engineering</option>
                <option value="CT">Computer Science Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="EEE">
                  Electrical and Electronics Engineering
                </option>
                <option value="ECE">
                  Electronics and Communication Engineering
                </option>
                <option value="IE">Instrumentation Engineering</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="PT">Production Technology</option>
                <option value="OTH">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Event Type <span className="text-danger">*</span>
              </label>
              <select
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
                required={true}
                className="form-select w-75 m-3"
              >
                <option value="Technical">Technical</option>
                <option value="Non-technical">Non-Technical</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                First Prize Money <span className="text-danger">*</span>
              </label>
              <TextInput
                trigger={["", " "]}
                required={true}
                type="text"
                className="create-event-text-input form-control m-3 w-75"
                value={formData.firstPrizeMoney}
                onChange={(e) =>
                  setFormData({ ...formData, firstPrizeMoney: e })
                }
              ></TextInput>
            </div>
            <div className="form-group">
              <label>
                Second Prize Money <span className="text-danger">*</span>
              </label>
              <TextInput
                trigger={["", " "]}
                required={true}
                type="text"
                className="create-event-text-input form-control m-3 w-75"
                value={formData.secondPrizeMoney}
                onChange={(e) =>
                  setFormData({ ...formData, secondPrizeMoney: e })
                }
              ></TextInput>
            </div>

            <div className="form-group">
              <label>
                Contact Name <span className="text-danger">*</span>
              </label>
              <TextInput
                trigger={["", " "]}
                options={suggestions}
                required={true}
                type="text"
                className="create-event-text-input form-control m-3 w-75"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e })}
              ></TextInput>
            </div>
            <div className="form-group">
              <label>Contact Phone</label>
              <TextInput
                trigger={["", " "]}
                options={suggestions}
                type="number"
                className="create-event-text-input form-control m-3 w-75"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e })}
              ></TextInput>
              <label className="ms-3 mb-3">
                <input
                  type="checkbox"
                  checked={formData.whatsapp}
                  onChange={() =>
                    setFormData({ ...formData, whatsapp: !formData.whatsapp })
                  }
                />{" "}
                WhatsApp no.
              </label>
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <TextInput
                trigger={["", " "]}
                options={suggestions}
                type="email"
                className="create-event-text-input form-control m-3 w-75"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e })}
              ></TextInput>
            </div>

            <div className="form-group">
              <label>Link</label>
              <input
                type="string"
                className="form-control m-3 w-75"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              ></input>
            </div>

            <div className="form-group">
              <label>Other Info</label>
              <TextInput
                trigger={["", " "]}
                options={suggestions}
                className="form-control m-3 w-75"
                rows="8"
                value={formData.otherInfo}
                onChange={(e) => setFormData({ ...formData, otherInfo: e })}
                style={{ resize: "none" }}
              ></TextInput>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.public}
                  onChange={(e) =>
                    setFormData({ ...formData, public: !formData.public })
                  }
                />{" "}
                Visible to others
              </label>
            </div>
            {error && <div className="alert alert-danger w-75">{error}</div>}
            {success && (
              <div className="alert alert-success w-75">{success}</div>
            )}
            {uploading && (
              <div className="alert alert-secondary w-75">
                Uploading your image...
              </div>
            )}
            {checkingConflicts && (
              <div className="alert alert-secondary w-75">
                Checking for conflicts...
              </div>
            )}
            {conflictsExist && (
              <div>
                <div className="alert alert-danger">
                  One or more events are occuring in the same time frame that
                  you have specified
                </div>
                <div className="my-2">
                  <button
                    type="button"
                    onClick={() => setShowConflictingEvents(true)}
                    className="btn btn-secondary btn-lg"
                  >
                    View conflicting events
                  </button>
                </div>
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      setConflictsExist(false);
                      setShowSubmitBtn(true);
                    }}
                  >
                    Continue
                  </button>
                </div>
                <EventConflictModal
                  isOpen={showConflictingEvents}
                  close={() => setShowConflictingEvents(false)}
                  events={conflictingEvents}
                />
              </div>
            )}
            {!showSubmitBtn && !conflictsExist && (
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Next
                </button>
              </div>
            )}
            {showSubmitBtn && (
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  {selectedImage ? "Upload image & create event" : "Create"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="col-lg-4">
        <UploadImage
          existingImage={existingImage}
          setExistingImage={setExistingImage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setImageModified={setImageModified}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
      </div>
      {showOrganizerForm && (
        <EventOrganisersForm
          organizers={organizers}
          setOrganizers={setOrganizers}
          id={id}
        />
      )}
    </div>
  );
};
export default EventDetailsForm;
