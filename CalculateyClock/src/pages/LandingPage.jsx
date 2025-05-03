{/*Edited By :Bryant Martinez*/}
{/*Edited By :Nick Marietta*/}

import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";
import FooterBar from "../components/FooterBar";
import TransitionButton from "../components/TransitionButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow pt-20">
        <GradientBackground>
          {/* ---------------------------------------------------------------------About Section--------------------------------------------------------------------------------- */}
          <section className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-[#ECDFCC] tracking-wide">
              About
            </h1>
            <p className="text-lg md:text-xl font-medium mb-10 text-[#ECDFCC] leading-relaxed">
              Ever wondered how much you'll really be making this pay week? Try
              our Paycheck Calculator Estimator — built using California's most
              recent 2024* income tax info.
            </p>

            {/* ---------------------------------------------------------------------Buttons--------------------------------------------------------------------------------- */}
            <div className="flex flex-col md:flex-row md:justify-center gap-6">
                <TransitionButton to="/incomecalc" className="bg-[#181C14] hover:bg-[#697565] text-[#ECDFCC] font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                  Go to Paycheck Estimator
                </TransitionButton>
              <TransitionButton to="/clockinclockout" className="bg-[#181C14] hover:bg-[#697565] text-[#ECDFCC] font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                  Go to Clock In / Out
                </TransitionButton>
              <TransitionButton to="/workoverview"
               className="bg-[#181C14] hover:bg-[#697565] text-[#ECDFCC] font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                  Go to Work Overview
                </TransitionButton>
            </div>
          </section>
        </GradientBackground>
      </main>

      {/* ---------------------------------------------------------------------Footer--------------------------------------------------------------------------------- */}
      <FooterBar>
        <div className="text-center text-[#ECDFCC] text-sm italic py-10 px-4">
          *Reminder: This is just an estimate. PayDayZ is not liable for issues
          between your employer and you. Consult a lawyer for legal matters.
        </div>
      </FooterBar>
    </div>
  );
}