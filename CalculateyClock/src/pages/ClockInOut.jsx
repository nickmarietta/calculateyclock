import { useState } from "react";
import { useShifts } from "../components/ShiftsContext.jsx";

const ClockInOut = () => {
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [shiftDate, setShiftDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { addShift } = useShifts();

  const handleAddShift = (e) => {
    e.preventDefault();

    if (!clockInTime || !clockOutTime) {
      alert("Please enter both clock in and clock out times");
      return;
    }

    const [inHours, inMinutes] = clockInTime.split(":").map(Number);
    const [outHours, outMinutes] = clockOutTime.split(":").map(Number);

    let totalHours = outHours - inHours + (outMinutes - inMinutes) / 60;

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


  // htmlFor is just the same as For in regular html but in jsx, it is a reserved word.
  // e.target.value is reference the event's target value (whatever the cursor clicks)
  return (
    <div>
      <h2>Clock In/Out</h2>
      <form onSubmit={handleAddShift}>
        <div>
          <label htmlFor="shiftDate">Date:</label>
          <input
            type="date"
            id="shiftDate"
            value={shiftDate}
            onChange={(e) => setShiftDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="clockIn" className="bold text-2xl">Clock In: </label>
          <input
            type="time"
            id="clockIn"
            value={clockInTime}
            onChange={(e) => setClockInTime(e.target.value)}
          />
        </div>
        <div>
          
          <label htmlFor="clockOut" className="bold text-2xl">Clock Out: </label>
          <input
            type="time"
            id="clockOut"
            value={clockOutTime}
            onChange={(e) => setClockOutTime(e.target.value)}
          />
        </div>
        <button type="submit">Add Shift</button>
      </form>
    </div>
  );
};

export default ClockInOut;
