{/*Edited By :Nickmarietta*/}
{/*Edited By :Bryant Martinez*/}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TransitionButton from "./TransitionButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-[#181C14] shadow-md border-b border-[#2a2a2a] flex items-center justify-center text-[#ECDFCC]">
      {/* ---------------------------------------------------------------------Create Box For Nav--------------------------------------------------------------------------------- */}
      <TransitionButton 
        to="/home"
        className="absolute left-0 h-full px-0 flex items-center"
      >
        <motion.img
          src="/Logo.png"
          alt="Logo"
          className="h-full object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </TransitionButton>

      {/* ---------------------------------------------------------------------Centered Links On Top--------------------------------------------------------------------------------- */}
      <div className="flex space-x-8 text-lg font-semibold">
        <TransitionButton
          to="/home"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Home
        </TransitionButton>
        <TransitionButton
          to="/incomecalc"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Estimator
        </TransitionButton>
        <TransitionButton
          to="/clockinclockout"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Clock In / Out
        </TransitionButton>
        <TransitionButton
          to="/workoverview"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Overview
        </TransitionButton>
      </div>
    </nav>
  );
}
