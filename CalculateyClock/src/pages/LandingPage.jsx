import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#3C3D37] p-4">
        <h1 className="text-4xl font-bold mb-4 text-white-800">
          About:  
        </h1>
        <p className="text-lg text-white-600 mb-6 text-center max-w-md">
          Utilize this tool to track how much money you made at your part time job!
        </p>
        <Link to="/calculator">
          <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow">
            Go to Calculator
          </button>
        </Link>
      </div>
    </div>
  );
}
