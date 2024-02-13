const UploadImage = ({
  existingImage,
  setExistingImage,
  selectedImage,
  setSelectedImage,
  setImageModified,
  suggestions,
  setSuggestions,
}) => {
  return (
    <div className="my-3 py-3 px-5 border shadow rounded">
      <div>
        <h3>Upload a Poster</h3>
        <p className="small text-muted">
          Must be &lt; 5 MB, preferred ratio 16:9
        </p>
        {(existingImage || selectedImage) && (
          <div>
            <img
              width={"250px"}
              src={existingImage || URL.createObjectURL(selectedImage)}
              alt="..."
              className="d-block mx-auto rounded"
            />
            <br />
            <button
              className="btn btn-danger d-block mx-auto mb-3"
              onClick={() => {
                setExistingImage(null);
                setSelectedImage(null);
                setImageModified(true);
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          required={true}
          name="img"
          accept="image/*"
          className="form-control"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
            const formData = new FormData();
            formData.append("img", event.target.files[0]);
            setExistingImage(null);
            setImageModified(true);
          }}
        />
      </div>
    </div>
  );
};
export default UploadImage;
