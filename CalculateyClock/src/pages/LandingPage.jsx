import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";
import FooterBar from "../components/FooterBar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <GradientBackground>
          <h1 className="text-3xl font-bold p-12 mb-2 text-center text-[#ECDFCC]">About:</h1>
          <p className="text-2xl font-bold mb-6 text-center text-[#ECDFCC]">
            Ever Wondered How Much You'll Really Be Making For Your Current Pay Week? Try Our Paycheck Calculator Estimator, Made Using California's Most Recent 2024* Income Tax Information. 
          </p>
          <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
          <Link to="/incomecalc">
            <button className="bg-[#2a2d34] hover:bg-[#988686] cursor-pointer text-[#ECDFCC] font-semibold py-2 px-4 mt-3 rounded-lg shadow">
              Go to Paycheck Estimator
            </button>
          </Link>
          <Link to="/clockinclockout" className="p-4">
            <button className="bg-[#2a2d34] hover:bg-[#988686] cursor-pointer text-[#ECDFCC] font-semibold py-2 px-4 mt-3 rounded-lg shadow">
              Go to Clock In / Out
            </button>
          </Link>
          <Link to="/workoverview">
            <button className="bg-[#2a2d34] hover:bg-[#988686] cursor-pointer text-[#ECDFCC] font-semibold py-2 px-4 mt-3 rounded-lg shadow">
              Go to Work Overview
            </button>
          </Link>
          </div>
          </GradientBackground>
          </main>
          <div>
          <FooterBar>
          <div className="flex flex-col items-center justify-center h-screen p-4 overflow-y-hidden">
            <h1 className="text-1 italic mb-20 pt-60text-center text-[#ECDFCC]">
              *Reminder This Is Just An Estimate, PayDayZ Is Not Liable For Company Issues Between Your Job And Yourself, Get A Lawyer
          </h1>
          </div>
          </FooterBar>
      </div>
    </div>
  );
}
