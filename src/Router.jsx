import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import EventCreationForm from "./pages/events/createEvent/EventCreationForm";
import EventDetail from "./pages/events/eventDetails/eventDetails";
import Viewevents from "./pages/events/viewEvents/viewEvents";
import UpdateEvent from "./pages/events/updateEvent/EventUpdateForm";
import ViewRegistrations from "./pages/events/viewRegistrations/ViewRegistrations";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import Profile from "./pages/user/profile/Profile";
import OrganisedEvents from "./pages/user/organisedEvents/OrganisedEvents";
import ParticipatedEvents from "./pages/user/participatedEvents/ParticipatedEvents";
import ForgotPassword from "./pages/auth/passwordReset/ForgotPassword";
import PasswordReset from "./pages/auth/passwordReset/PasswordReset";
import { useEffect } from "react";
import axios from "axios";
import Home from "./pages/home/Home";

function Router({ authContext }) {
  const location = useLocation();
  const { user } = authContext;

  useEffect(() => {
    axios.post("/api/logs/", {
      path: location.pathname,
      user,
    });
  }, [location]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Viewevents category="UPCOMING" />} />
        <Route path="/eventdetails/:id" element={<EventDetail />} />
        <Route
          path="/events/update/:id"
          element={!user ? <Navigate to="/login" /> : <UpdateEvent />}
        />
        <Route
          path="/eventcreationform"
          element={
            !user ? (
              <Navigate to="/login?flow=eventcreationform" />
            ) : (
              <EventCreationForm />
            )
          }
        />
        <Route
          path="/upcoming-events"
          element={<Viewevents category="UPCOMING" />}
        />
        <Route path="/archives" element={<Viewevents category="ARCHIVES" />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={!user ? <Navigate to="/login" /> : <Profile />}
        />
        <Route
          path="view-registrations/:id"
          element={user ? <ViewRegistrations /> : <Navigate to="/login" />}
        />
        <Route
          path="organised-events"
          element={user ? <OrganisedEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="participated-events"
          element={user ? <ParticipatedEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/forgot-password"
          element={!user ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password"
          element={!user ? <PasswordReset /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default Router;
