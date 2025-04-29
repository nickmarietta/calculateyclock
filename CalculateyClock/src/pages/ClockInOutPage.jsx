import { useState } from "react";
import { useShifts } from "../components/ShiftsContext.jsx";
import { Link } from "react-router-dom"; // Use 'react-router-dom' instead of 'react-router'
import dayjs from "dayjs";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";

const ClockInOut = () => {
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [shiftDate, setShiftDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { addShift } = useShifts();

  const handleAddShift = (e) => {
    e.preventDefault();

    const start = dayjs(`${shiftDate}T${clockInTime}`);
    const end = dayjs(`${shiftDate}T${clockOutTime}`);

    let totalHours = end.diff(start, "minute") / 60;

    // we need hours in any case to do math
    if (totalHours < 0) {
      totalHours += 24;
    }

    totalHours = Math.round(totalHours * 4) / 4;

    addShift({
      date: shiftDate,
      clockIn: clockInTime,
      clockOut: clockOutTime,
      hours: totalHours,
    });

    setClockInTime("");
    setClockOutTime("");
  };

  return (
    <GradientBackground>
      <div className="flex flex-col flex-grow">
        <Navbar />

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6 flex-grow">
          <h1 className="bold text-4xl p-4">Clock In/Out</h1>

          <form onSubmit={handleAddShift}>
            <div className="mb-4">
              <label htmlFor="shiftDate" className="bold text-2xl pr-10">
                Date:
              </label>
              <input
                type="date"
                id="shiftDate"
                value={shiftDate}
                onChange={(e) => setShiftDate(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="clockIn" className="bold text-2xl pr-10">
                What time did you clock in?:
              </label>
              <input
                type="time"
                id="clockIn"
                value={clockInTime}
                onChange={(e) => setClockInTime(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="clockOut" className="bold text-2xl pr-10">
                What time did you clock out?
              </label>
              <input
                type="time"
                id="clockOut"
                value={clockOutTime}
                onChange={(e) => setClockOutTime(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bold text-2xl border-2 rounded-sm border-solid cursor-pointer mt-4 p-2"
            >
              Add Shift
            </button>
          </form>
        </div>
      </div>
    </GradientBackground>
  );
};

export default ClockInOut;
