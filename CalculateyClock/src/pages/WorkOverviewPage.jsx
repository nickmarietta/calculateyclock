// change this page so that it makes usage of the react-big-calendar library

import { useState } from "react";
import { useShifts } from "../components/ShiftsContext";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


export default function WorkOverview() {
  const { shifts } = useShifts();
  const safeShifts = shifts ?? [];
  const [viewMode, setViewMode] = useState("list");
  const localizer = momentLocalizer(moment);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = safeShifts.map((shift, index) => {
    const start = moment(`${shift.date} ${shift.clockIn}`, "YYYY-MM-DD HH:mm").toDate();
    const end = moment(`${shift.date} ${shift.clockOut}`, "YYYY-MM-DD HH:mm").toDate();
  
    return {
      id: index,
      title: `Worked ${shift.hours}h`,
      start,
      end,
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
    <GradientBackground>
    <Navbar />
    <main className="flex-grow pt-20 px-4 pb-10">
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-5xl mx-auto mt-6">
    <h1 className="text-3xl font-bold mb-6 text-[[#181C14]">Work Overview</h1>

    <div className="flex justify-center mb-4 gap-2">
      <button
        onClick={() => setViewMode("list")}
        className={`px-4 py-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        List View
      </button>
      <button
        onClick={() => setViewMode("calendar")}
        className={`px-4 py-2 rounded ${viewMode === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Calendar View
      </button>
    </div>

          {safeShifts.length === 0 ? (
            <p>No shifts logged yet.</p>
          ) : viewMode === "list" ? (
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
          ) : (
            <div className="relative z-10 bg-white rounded shadow p-4" style={{ height: "650px" }}>
                <Calendar
                  key={viewMode}
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  titleAccessor="title"
                  view={currentView}
                  date={currentDate}
                  onView={(view) => setCurrentView(view)}
                  onNavigate={(date) => setCurrentDate(date)}
                  views={["month", "week", "day"]}
                  style={{ height: "100%" }}
                />

            </div>
          )}
        </div>
      </main>
    </GradientBackground>
    </div>
  );
}
