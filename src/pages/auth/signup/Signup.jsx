import Header from "../../../components/events/Header";
import { useForm } from "react-hook-form";
import signupStyles from "./signupStyles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomProgressBar from "../../../components/progressBar/CustomProgressBar";
import { useSignup } from "../../../hooks/useSignup";

const Signup = () => {
  const { signup, isLoading, error: signUpError } = useSignup();
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    setError(signUpError);
  }, [signUpError]);

  const addUser = async (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    await signup(data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      let progress = 0;
      if (value.userName) progress++;
      if (value.regNo) progress++;
      if (value.mobile) progress++;
      if (value.dept) progress++;
      if (value.email) progress++;
      if (value.password) progress++;
      if (value.confirmPassword) progress++;
      setCompleted((progress * 100) / 7);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="EventCreationPage container">
      <div className="row pb-5">
        <div className="px-5">
          <Header title={"Sign Up"} />
        </div>
        <div className="col-lg-8 mx-auto">
          <div className="EventCreationForm my-3 py-4 px-5 border shadow rounded">
            <span className="text-secondary">Progress</span>
            <CustomProgressBar completed={completed} />
            <form className="pt-3" onSubmit={handleSubmit(addUser)}>
              <div className="form-group">
                <label>
                  Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  {...register("userName", {
                    required: "Name is Required",
                  })}
                  className={`form-control m-3  ${
                    errors.userName ? signupStyles.errorInput : ""
                  }`}
                ></input>
                {errors.userName && (
                  <span className={`${signupStyles.error} `}>
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Register Number</label>
                <input
                  type="text"
                  className={`form-control m-3  ${
                    errors.regNo ? signupStyles.errorInput : ""
                  }`}
                  {...register("regNo", {
                    required: "Register Number is Required",
                  })}
                ></input>
                {errors.regNo && (
                  <span className={`${signupStyles.error} `}>
                    {errors.regNo.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control m-3  ${
                    errors.mobile ? signupStyles.errorInput : ""
                  }`}
                  {...register("mobile", {
                    required: "Mobile Number is Required",
                  })}
                ></input>
                {errors.mobile && (
                  <span className={`${signupStyles.error} `}>
                    {errors.mobile.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Department</label>
                <select {...register("dept")} className="form-select  m-3">
                  <option value="AERO">Aeronautical Engineering</option>
                  <option value="AUTO">Automobile Engineering</option>
                  <option value="CT">Computer Science Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">
                    Electronics and Communication Engineering
                  </option>
                  <option value="IE">Instrumentation Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="PT">Production Technology</option>
                  <option value="RPT">Rubber and Plastics Technology</option>
                  <option value="OTH">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control m-3  ${
                    errors.email ? signupStyles.errorInput : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                ></input>
                {errors.email && (
                  <span className={`${signupStyles.error} `}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control m-3  ${
                    errors.email ? signupStyles.errorInput : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                ></input>
                {errors.password && (
                  <span className={`${signupStyles.error} `}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control m-3  ${
                    errors.email ? signupStyles.errorInput : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                ></input>
                {errors.confirmPassword && (
                  <span className={`${signupStyles.error} `}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {error && <div className="alert alert-danger">Oops! {error}</div>}
              {isLoading && (
                <div className="alert alert-info">
                  Strap in, we're about to blast off into the world of tech and
                  culture...
                </div>
              )}
              <div className="form-group  text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
