import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShiftsProvider } from "./components/ShiftsContext.jsx";
import LandingPage from './pages/LandingPage';
import ClockInOut from './pages/ClockInOut';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShiftsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/calculator" element={<ClockInOut />} />
        </Routes>
      </ShiftsProvider>
    </BrowserRouter>
  </StrictMode>
);
