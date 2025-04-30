// change this page so that it makes usage of the react-big-calendar library

import { useShifts } from "../components/ShiftsContext";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";

export default function WorkOverview() {
  const { shifts } = useShifts();
  const safeShifts = shifts ?? [];

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
    <GradientBackground>
        {/* Navbar */}

        {/* Main content box */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6 flex-grow">
          <h1 className="text-3xl font-bold mb-4">Work Overview</h1>

          {safeShifts.length === 0 ? (
            <p>No shifts logged yet.</p>
          ) : (
            <ul className="space-y-2">
              {safeShifts.map((shift, index) => (
                <li
                  key={index}
                  className="border p-4 rounded-md shadow-sm bg-white text-black"
                >
                  <p>
                    <strong>Date:</strong> {shift.date}
                  </p>
                  <p>
                    <strong>Clock In:</strong> {shift.clockIn}
                  </p>
                  <p>
                    <strong>Clock Out:</strong> {shift.clockOut}
                  </p>
                  <p>
                    <strong>Total Hours:</strong> {shift.hours}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
    </GradientBackground>
    </main>
    </div>
  );
}
