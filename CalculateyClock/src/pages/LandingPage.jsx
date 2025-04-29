import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen p-4 overflow-y-hidden">
        <GradientBackground>
          <h1 className="text-4xl font-bold mb-4 text-white-800">About:</h1>
          <p className="text-lg text-white-600 mb-6 text-center max-w-md">
            Utilize this tool to track how much money you made at your part time
            job!
          </p>
          <Link to="/incomecalc">
            <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold p-4 rounded-lg shadow">
              Go to Paycheck Estimator
            </button>
          </Link>
          <Link to="/clockinclockout" className="p-4">
            <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold p-4 rounded-lg shadow">
              Go to Clock In / Out
            </button>
          </Link>
          <Link to="/workoverview">
            <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold p-4 rounded-lg shadow">
              Go to Work Overview
            </button>
          </Link>
        </GradientBackground>
      </div>
    </div>
  );
}
