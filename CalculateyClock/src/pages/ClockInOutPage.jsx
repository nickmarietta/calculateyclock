import { useState } from "react";
import { useShifts } from "../components/ShiftsContext.jsx";
import { Link } from "react-router";
import dayjs from "dayjs";

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

  // htmlFor is just the same as For in regular html but in jsx, it is a reserved word (moves the cursor over automatically once clicked)
  // e.target.value is reference the event's target value (whatever the cursor clicks)
  return (
    <div>
      <Link to="/">
        <button className="bold text-2xl border-2 rounded-sm border-solid cursor-pointer">
          Home
        </button>
      </Link>
      <h1 className="bold text-4xl p-20">Clock In/Out</h1>
      <form onSubmit={handleAddShift}>
        <div>
          <label htmlFor="shiftDate" className="bold text-2xl pr-10">
            Date:
          </label>
          <input
            type="date"
            id="shiftDate"
            value={shiftDate}
            onChange={(e) => setShiftDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="clockIn" className="bold text-2xl pr-10">
            What time did you clock in?:{" "}
          </label>
          <input
            type="time"
            id="clockIn"
            value={clockInTime}
            onChange={(e) => setClockInTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="clockOut" className="bold text-2xl pr-10">
            What time did you clock out?
          </label>
          <input
            type="time"
            id="clockOut"
            value={clockOutTime}
            onChange={(e) => setClockOutTime(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bold text-2xl border-2 rounded-sm border-solid cursor-pointer"
        >
          Add Shift
        </button>
      </form>
    </div>
  );
};

export default ClockInOut;
