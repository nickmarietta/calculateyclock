import { Link } from "react-router-dom";
import logo from "/public/logo.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-[#181C14] shadow-md border-b border-[#2a2a2a] flex items-center justify-center text-[#ECDFCC]">
      {/* ---------------------------------------------------------------------Create Box For Nav--------------------------------------------------------------------------------- */}
      <Link
        to="/home"
        className="absolute left-0 h-full px-0 flex items-center"
      >
        <img
          src={logo}
          alt="Logo"
          className="h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* ---------------------------------------------------------------------Centered Links On Top--------------------------------------------------------------------------------- */}
      <div className="flex space-x-8 text-lg font-semibold">
        <Link
          to="/home"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Home
        </Link>
        <Link
          to="/incomecalc"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Estimator
        </Link>
        <Link
          to="/clockinclockout"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Clock In / Out
        </Link>
        <Link
          to="/workoverview"
          className="relative after:block after:h-[2px] after:bg-[#697565] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-[#697565] transition-colors"
        >
          Overview
        </Link>
      </div>
    </nav>
  );
}
