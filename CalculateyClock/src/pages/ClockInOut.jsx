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
  
//----------------------------- Calculate Hours Worked  --------------------------
const [inHours, inMinutes] = clockInTime.split(":").map(Number);
      const [outHours, outMinutes] = clockOutTime.split(":").map(Number);
  
      let totalHours = outHours - inHours + (outMinutes - inMinutes) / 60;
  
//----------------------------- Any Shifts Over 24 Hours --------------------------
      if (totalHours < 0) {
        totalHours += 24;
      }
  
//----------------------------- Round To Nearest Quarter Hour --------------------------
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
  //----------------------- Layout For Page ---------------------------------
    return (
      <div className="clock-in-out-container">
        <h2>Clock In/Out</h2>
        <form onSubmit={handleAddShift}>
          <div className="form-group">
            <label htmlFor="shiftDate">Date:</label>
            <input type="date" id="shiftDate"
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clockIn">Clock In:</label>
              <input type="time" id="clockIn"
                value={clockInTime}
                onChange={(e) => setClockInTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="clockOut">Clock Out:</label>
              <input type="time" id="clockOut"
                value={clockOutTime}
                onChange={(e) => setClockOutTime(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary"> Add Shift </button>
        </form>
      </div>
    );
  };
  
  export default ClockInOut;
  