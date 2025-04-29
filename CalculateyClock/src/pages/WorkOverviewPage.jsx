// complete this page so it shows the overall shifts
import { useShifts } from "../components/ShiftsContext";
import { Link } from "react-router";

export default function WorkOverview() {
  const { shifts } = useShifts();
  const safeShifts = shifts ?? []; // this goes back to an empty array in case there is an error

  return (
    <div className="p-4">
      <Link to="/">
        <button className="bold text-2xl border-2 rounded-sm border-solid cursor-pointer">
          Home
        </button>
      </Link>
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
  );
}
