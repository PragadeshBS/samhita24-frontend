import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/navbar/Navbar";
import Loading from "./pages/loader/loading.svg";
import Header from "./components/templates/Header";
import Router from "./Router";

function App() {
  const authContext = useAuthContext();
  const { loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ReactNotifications />
      <BrowserRouter>
        {/* <Header /> */}
        {/* <Navbar /> */}
        <Router authContext={authContext} />
      </BrowserRouter>
    </div>
  );
}

export default App;
