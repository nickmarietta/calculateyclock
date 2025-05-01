import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShiftsProvider } from "./components/ShiftsContext.jsx";
import LandingPage from "./pages/LandingPage";
import ClockInOut from "./pages/ClockInOutPage";
import WorkOverview from "./pages/WorkOverviewPage.jsx";
import StandaloneCaliforniaCalculator from "./pages/IncomeCalculatorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShiftsProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route
            path="/incomecalc"
            element={<StandaloneCaliforniaCalculator />}
          />
          <Route path="/clockinclockout" element={<ClockInOut />} />
          <Route path="/workoverview" element={<WorkOverview />} />
        </Routes>
      </ShiftsProvider>
    </BrowserRouter>
  </StrictMode>
);
