import Header from "../../../components/events/Header";
import { useForm } from "react-hook-form";
import loginStyles from "./loginStyles.module.css";
import { useLogin } from "../../../hooks/useLogin";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const { user } = useAuthContext();
  const { login, error, isLoading } = useLogin();
  const [searchParams] = useSearchParams();
  const flow = searchParams.get("flow");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addUser = async (data) => {
    await login(data);
  };

  if (user) {
    return <Navigate to={flow ? `/${flow}` : "/"} />;
  }

  return (
    <div className="EventCreationPage container">
      <div className="row pb-5">
        <div className="px-5">
          <Header title={"Login"} />
        </div>
        <div className="col-lg-8 mx-auto">
          <div className="EventCreationForm py-4 px-3 border shadow rounded">
            {(flow || isLoading) && (
              <div className="alert alert-info text-center mx-auto">
                {isLoading
                  ? "Weaving the login magic, almost there..."
                  : "Your journey begins with a login. Go ahead!"}
              </div>
            )}
            <form className="pt-3" onSubmit={handleSubmit(addUser)}>
              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control mx-auto m-3  ${
                    errors.email ? loginStyles.errorInput : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                ></input>
                {errors.email && (
                  <span className={`${loginStyles.error} `}>
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
                  className={`form-control m-3 mx-auto  ${
                    errors.email ? loginStyles.errorInput : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                ></input>
                {errors.password && (
                  <span className={`${loginStyles.error} `}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group  text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Login
                </button>
              </div>
              <div>
                <div className="small text-muted">
                  Don't have an account? <Link to="/signup">Sign up</Link> here.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
