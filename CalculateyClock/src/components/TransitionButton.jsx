{/*Edited By :Bryant Martinez*/}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TransitionButton = ({ to, children, className }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default TransitionButton;