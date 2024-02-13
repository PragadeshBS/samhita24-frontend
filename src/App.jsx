import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/navbar/Navbar";
import Loading from "./pages/loader/loading.svg";
import Router from "./Router";
import Footer from "./components/footer/Footer";

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
        <Navbar />
        <Router authContext={authContext} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
