import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    setIsLoading(true);
    setError(null);

    axios
      .post("/api/auth/signup", data)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ user: res.data.email, token: res.data.token })
        );
        dispatch({
          type: "LOGIN",
          payload: { user: res.data.email, token: res.data.token },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  return { signup, isLoading, error };
};
