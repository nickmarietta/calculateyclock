{
  /*Edited By :Bryant Martinez*/
}
{
  /*Edited By :Nick Marietta*/
}
{
  /*Edited By :Eduardo Perez*/
}

import { useState } from "react";
import { useShifts } from "../components/ShiftsContext";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

{
  /*----------------------------------------Infomration From IncomeCalculator---------------*/
}
function calculateCaliforniaTax(income) {
  if (income <= 10099) return income * 0.01;
  if (income <= 23942) return 100.99 + (income - 10099) * 0.02;
  if (income <= 37788) return 377.85 + (income - 23942) * 0.04;
  if (income <= 52455) return 931.69 + (income - 37788) * 0.06;
  if (income <= 66295) return 1811.71 + (income - 52455) * 0.08;
  if (income <= 338639) return 2918.91 + (income - 66295) * 0.093;
  if (income <= 406364) return 28246.9 + (income - 338639) * 0.103;
  if (income <= 677275) return 35222.58 + (income - 406364) * 0.113;
  return 65835.52 + (income - 677275) * 0.123;
}

function calculateFederalTax(income) {
  if (income <= 11000) return income * 0.1;
  if (income <= 44725) return 1100 + (income - 11000) * 0.12;
  if (income <= 95375) return 5147 + (income - 44725) * 0.22;
  if (income <= 182100) return 16290 + (income - 95375) * 0.24;
  if (income <= 231250) return 37104 + (income - 182100) * 0.32;
  if (income <= 578125) return 52832 + (income - 231250) * 0.35;
  return 174238.25 + (income - 578125) * 0.37;
}
{
  /*----------------------------------------Math Related Area ---------------*/
}

function calculateEarnings(hours, hourlyWage, retirement401k = 5) {
  const grossIncome = hourlyWage * hours;
  const contribution401k = (grossIncome * retirement401k) / 100;
  const taxableIncome = grossIncome - contribution401k;

  const californiaTax = calculateCaliforniaTax(taxableIncome);
  const federalTax = calculateFederalTax(taxableIncome);
  const socialSecurityTax = Math.min(taxableIncome * 0.062, 9932.4);
  const medicareTax = taxableIncome * 0.0145;

  const totalTaxes =
    californiaTax + federalTax + socialSecurityTax + medicareTax;
  const netIncome = taxableIncome - totalTaxes;

  return {
    grossIncome,
    contribution401k,
    californiaTax,
    federalTax,
    socialSecurityTax,
    medicareTax,
    totalTaxes,
    netIncome,
  };
}

{
  /*----------------------------------------Results Will Show In Green, to Show Total Made---------------*/
}

function ResultRow({ label, value, isBold = false, isGreen = false }) {
  return (
    <div className={`flex justify-between ${isBold ? "font-bold" : ""}`}>
      <span>{label}</span>
      <span className={isGreen ? "text-green-600" : ""}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}
{
  /*----------------------------------------Export WorkOverview Information ---------------*/
}

export default function WorkOverview() {
  const navigate = useNavigate();
  const { shifts, setShifts } = useShifts();
  const safeShifts = shifts ?? [];
  const [viewMode, setViewMode] = useState("list");
  const localizer = momentLocalizer(moment);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hourlyWage, setHourlyWage] = useState(20);
  const [retirement401k, setRetirement401k] = useState(5);
  const [showEarningsDetails, setShowEarningsDetails] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    clockIn: "",
    clockOut: "",
    hours: "",
  });

  {
    /*----------------------------------------Math To Calculate Hours And Time From Time Sheet ---------------*/
  }
  const totalHours = safeShifts.reduce(
    (sum, shift) => sum + parseFloat(shift.hours),
    0
  );
  const earningsSummary = calculateEarnings(
    totalHours,
    hourlyWage,
    retirement401k
  );

  const events = safeShifts.map((shift, index) => {
    const start = moment(
      `${shift.date} ${shift.clockIn}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    const end = moment(
      `${shift.date} ${shift.clockOut}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    const earnings = calculateEarnings(
      parseFloat(shift.hours),
      hourlyWage,
      retirement401k
    );

    return {
      id: index,
      title: `${shift.hours}h ($${earnings.netIncome.toFixed(2)})`,
      start,
      end,
      earnings,
      shift,
    };
  });

  const toggleEarningsDetails = (index) => {
    setShowEarningsDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  {
    /*----------------------------------------Edit/Delete Shifts ---------------------------------------------------------*/
  }

  const deleteShift = (index) => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      const updatedShifts = [...safeShifts];
      updatedShifts.splice(index, 1);
      setShifts(updatedShifts);
    }
  };

  const openEditModal = (shift, index) => {
    setCurrentShift(index);
    setEditFormData({
      date: shift.date,
      clockIn: shift.clockIn,
      clockOut: shift.clockOut,
      hours: shift.hours,
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentShift(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };
  {
    /*----------------------------------------Math To Calculate Hours And Time From Time Sheet ---------------*/
  }
  const calculateHours = () => {
    try {
      const startTime = moment(
        `${editFormData.date} ${editFormData.clockIn}`,
        "YYYY-MM-DD HH:mm"
      );
      const endTime = moment(
        `${editFormData.date} ${editFormData.clockOut}`,
        "YYYY-MM-DD HH:mm"
      );

      // Handle overnight shifts
      if (endTime.isBefore(startTime)) {
        endTime.add(1, "days");
      }

      const duration = moment.duration(endTime.diff(startTime));
      const hours = duration.asHours();

      return hours.toFixed(2);
    } catch (error) {
      return editFormData.hours;
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    {
      /*----------------------------------------Math To Calculate Hours And Time From Time Sheet If Info Changes ---------------*/
    }
    const calculatedHours = calculateHours();

    if (currentShift !== null) {
      const updatedShifts = [...safeShifts];
      updatedShifts[currentShift] = {
        ...editFormData,
        hours: calculatedHours,
      };

      setShifts(updatedShifts);
      closeEditModal();
    }
  };

  const EventComponent = ({ event }) => (
    <div className="text-xs">
      <strong>{event.title}</strong>
    </div>
  );
  {
    /*---------------------------------------Create The Box For The Overview ---------------*/
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GradientBackground>
        <Navbar />
        <main className="flex-grow pt-20 px-4 pb-10">
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-5xl mx-auto mt-6">
            <h1 className="text-3xl font-bold mb-6 text-[#181C14]">
              Work Overview
            </h1>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Hourly Wage ($)
                </label>
                <input
                  type="number"
                  value={hourlyWage}
                  onChange={(e) =>
                    setHourlyWage(Math.max(0, parseFloat(e.target.value) || 0))
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  401(k) Contribution (%)
                </label>
                <input
                  type="number"
                  value={retirement401k}
                  onChange={(e) =>
                    setRetirement401k(
                      Math.min(
                        100,
                        Math.max(0, parseFloat(e.target.value) || 0)
                      )
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {safeShifts.length > 0 && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">Earnings Summary</h2>
                  <button
                    onClick={() => navigate("/clockinclockout")}
                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add New Shift
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ResultRow
                      label="Total Hours:"
                      value={totalHours}
                      isBold={true}
                    />
                    <ResultRow
                      label="Gross Income:"
                      value={earningsSummary.grossIncome}
                    />
                    <ResultRow
                      label="401(k) Contribution:"
                      value={earningsSummary.contribution401k}
                    />
                  </div>
                  <div>
                    <ResultRow
                      label="Total Taxes:"
                      value={earningsSummary.totalTaxes}
                    />
                    <ResultRow
                      label="Net Income:"
                      value={earningsSummary.netIncome}
                      isBold={true}
                      isGreen={true}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center mb-4 gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`cursor-pointer px-4 py-2 rounded ${
                  viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`cursor-pointer px-4 py-2 rounded ${
                  viewMode === "calendar"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Calendar View
              </button>
            </div>

            {safeShifts.length === 0 ? (
              <p>No shifts logged yet.</p>
            ) : viewMode === "list" ? (
              <ul className="space-y-4">
                {safeShifts.map((shift, index) => {
                  const earnings = calculateEarnings(
                    parseFloat(shift.hours),
                    hourlyWage,
                    retirement401k
                  );
                  return (
                    <li
                      key={index}
                      className="border p-4 rounded-md shadow-sm bg-white text-black"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p>
                            <strong>Date:</strong> {shift.date}
                          </p>
                          <p>
                            <strong>Hours:</strong> {shift.hours} (
                            {shift.clockIn} - {shift.clockOut})
                          </p>
                        </div>
                        <div className="text-right">
                          <p>
                            <strong>Gross:</strong> $
                            {earnings.grossIncome.toFixed(2)}
                          </p>
                          <p className="text-green-600 font-bold">
                            <strong>Net:</strong> $
                            {earnings.netIncome.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => toggleEarningsDetails(index)}
                          className="text-blue-500 text-sm hover:underline cursor-pointer"
                        >
                          {showEarningsDetails[index]
                            ? "Hide Details"
                            : "Show Details"}
                        </button>
                        <button
                          onClick={() => openEditModal(shift, index)}
                          className="text-yellow-600 text-sm hover:underline ml-4 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteShift(index)}
                          className="text-red-600 text-sm hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                      {/*----------------------------------------Show All Details Abour Earnings ---------------------------------------------------------*/}
                      {showEarningsDetails[index] && (
                        <div className="mt-2 pt-2 border-t text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <ResultRow
                                label="401(k) Contribution:"
                                value={earnings.contribution401k}
                              />
                              <ResultRow
                                label="California Tax:"
                                value={earnings.californiaTax}
                              />
                              <ResultRow
                                label="Federal Tax:"
                                value={earnings.federalTax}
                              />
                            </div>
                            <div>
                              <ResultRow
                                label="Social Security:"
                                value={earnings.socialSecurityTax}
                              />
                              <ResultRow
                                label="Medicare:"
                                value={earnings.medicareTax}
                              />
                              <ResultRow
                                label="Total Taxes:"
                                value={earnings.totalTaxes}
                                isBold={true}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div
                className="relative z-10 bg-white rounded shadow p-4"
                style={{ height: "650px" }}
              >
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
                  components={{
                    event: EventComponent,
                  }}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: "#4CAF50",
                      borderRadius: "4px",
                      color: "white",
                      border: "none",
                    },
                  })}
                  tooltipAccessor={(event) => {
                    const earnings = event.earnings;
                    return `Hours: ${
                      event.shift.hours
                    }\nGross: ${earnings.grossIncome.toFixed(
                      2
                    )}\nNet: ${earnings.netIncome.toFixed(2)}`;
                  }}
                  onSelectEvent={(event) => {
                    {
                      /*----------------------------------------Open Edit Model---------------------------------------------------------*/
                    }
                    openEditModal(event.shift, event.id);
                  }}
                />
              </div>
            )}
          </div>
        </main>

        {/*----------------------------------------Edit Model ---------------------------------------------------------*/}
        {editModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Shift</h2>

              <form onSubmit={handleEditFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Clock In</label>
                    <input
                      type="time"
                      name="clockIn"
                      value={editFormData.clockIn}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Clock Out
                    </label>
                    <input
                      type="time"
                      name="clockOut"
                      value={editFormData.clockOut}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 border border-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </GradientBackground>
    </div>
  );
}
