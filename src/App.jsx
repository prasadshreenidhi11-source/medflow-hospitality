import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================
            PROTECTED HOSPITAL SYSTEM
        ========================= */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>

                  <Route
                    path="/"
                    element={<Dashboard />}
                  />

                  <Route
                    path="/calendar"
                    element={<Calendar />}
                  />

                  <Route
                    path="/patients"
                    element={<Patients />}
                  />

                  <Route
                    path="/appointments"
                    element={<Appointments />}
                  />

                  <Route
                    path="/doctors"
                    element={<Doctors />}
                  />

                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;