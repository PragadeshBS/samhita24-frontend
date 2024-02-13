import { useForm } from "react-hook-form";
import ProfileStyles from "./ProfileStyles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../loader/loading.svg";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext();
  const [userId, setUserId] = useState("");
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLoading(false);
        setUserId(res.data._id);
        reset({
          userName: res.data.userName,
          regNo: res.data.regNo,
          mobile: res.data.mobile,
          dept: res.data.dept,
          email: res.data.email,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [token, reset]);

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
    <div className="EventCreationPage container">
      <div className="row">
        <h1 className="display-3 pt-3">Profile</h1>
        <div className="col-lg-8 mx-auto">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3">
              <div className="form-group">
                <label>
                  Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  {...register("userName", {
                    required: "Name is Required",
                  })}
                  className={`form-control m-3 ${
                    errors.userName ? ProfileStyles.errorInput : ""
                  }`}
                  readOnly
                ></input>
                {errors.userName && (
                  <span className={`${ProfileStyles.error} `}>
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Register Number</label>
                <input
                  type="text"
                  className={`form-control m-3  ${
                    errors.regNo ? ProfileStyles.errorInput : ""
                  }`}
                  {...register("regNo")}
                  readOnly
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control m-3  ${
                    errors.mobile ? ProfileStyles.errorInput : ""
                  }`}
                  {...register("mobile", {
                    required: "Mobile Number is Required",
                  })}
                  readOnly
                ></input>
                {errors.mobile && (
                  <span className={`${ProfileStyles.error} `}>
                    {errors.mobile.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  className={`form-control m-3  ${
                    errors.dept ? ProfileStyles.errorInput : ""
                  }`}
                  {...register("dept")}
                  readOnly
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control m-3  ${
                    errors.email ? ProfileStyles.errorInput : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                  readOnly
                ></input>
                {errors.email && (
                  <span className={`${ProfileStyles.error} `}>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
