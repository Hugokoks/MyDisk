import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import { RegisterProvider } from "./contexts/RegisterContext";
import EmailRedirect from "./pages/EmailRedirect/EmailRedirect";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterProvider><Register /></RegisterProvider>} />
        <Route path="email_redirect" element={<EmailRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
