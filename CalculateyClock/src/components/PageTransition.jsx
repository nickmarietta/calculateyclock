{/*Edited By :Bryant Martinez*/}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
{/* ---------------------------------------------------------------------Use Effect For Transition --------------------------------------------------------------------------------- */}

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayLocation(location);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 300);
    }
  }, [location, displayLocation]);

  return (
    <div className="relative w-full h-full">
{/* ---------------------------------------------------------------------Current Page--------------------------------------------------------------------------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayLocation.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

{/* ---------------------------------------------------------------------Move Box From Right To Left--------------------------------------------------------------------------------- */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x : 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;