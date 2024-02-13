import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (data) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("/api/auth/login", data)
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
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  return { login, isLoading, error };
};
