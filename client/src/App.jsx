import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterProvider } from "./contexts/RegisterContext";
import { LoginProvider } from "./contexts/LoginContext";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

// Lazy load pages
const Register = lazy(() => import("./pages/Register/Register"));
const EmailRedirect = lazy(() => import("./pages/EmailRedirect/EmailRedirect"));
const UserValidation = lazy(() => import("./pages/UserValidation/UserValidation"));
const Login = lazy(() => import("./pages/Login/Login"));
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>

          <Route path="register" element={<RegisterProvider><Register /></RegisterProvider>} />
          <Route path="login" element={<LoginProvider><Login /></LoginProvider>} />
          <Route path="email_redirect" element={<EmailRedirect />} />
          <Route path="user_validation" element={<UserValidation />} />
          <Route path="test" element={<LoadingPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter >
  );
}
