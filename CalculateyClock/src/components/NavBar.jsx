import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#181C14] text-[#ECDFCC]">
      <div className="text-xl font-bold">Calculate y Clock</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-[#697565]">
          Home
        </Link>
        <Link to="/calculator" className="hover:text-[#697565]">
          Paycheck Estimator
        </Link>
        <Link to="/calculator" className="hover:text-[#697565]">
          Clock In / Out
        </Link>
        <Link to="/workoverview" className="hover:text-[#697565]">
          Work Overview
        </Link>
      </div>
    </nav>
  );
}
