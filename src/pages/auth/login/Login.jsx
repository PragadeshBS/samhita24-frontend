import { useForm } from "react-hook-form";
import { useLogin } from "../../../hooks/useLogin";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Input, Typography, Button } from "@material-tailwind/react";
import Danger from "../../../components/alerts/Danger";
import Info from "../../../components/alerts/Info";

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
    <div className="container mx-auto">
      <div className="page-view">
        <div>
          <div className="max-w-xl">
            <Typography variant="h1">Login</Typography>
            <Info>
              If you had registered for Mutex 2023, please login with the same
              credentials
            </Info>
            <form onSubmit={handleSubmit(addUser)}>
              <div className="my-3">
                <Input
                  label="Email"
                  type="email"
                  size="lg"
                  color={errors.email ? "red" : "white"}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="my-3">
                <Input
                  label="Password"
                  type="password"
                  color={errors.password ? "red" : "white"}
                  size="lg"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              {error && <Danger>{error}</Danger>}
              <Button
                className="rounded-full bg-primaryLight"
                type="submit"
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
            <div className="my-3 text-sm">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
