
export default function LandingPage() {
    return (
        <ShiftProvider>
        <div className="container">
          <header className="app-header">
            <h1>Part-Time Paycheck Estimator</h1>
            <p>Track your shifts and estimate your paycheck after taxes (CA)</p>
          </header>
  
          <div className="app-body">
            <PaycheckEstimator />
            <ClockInOut />
            <WorkHistory />
          </div>
        </div>
      </ShiftProvider>
    );
  };
    

