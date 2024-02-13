import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./contexts/AuthContext";
import "./index.css";
import App from "./App";
import axios from "axios";
import config from "./config";
import { ThemeProvider } from "@material-tailwind/react";

axios.defaults.baseURL = config.apiUrl;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
