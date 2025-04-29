import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import GradientBackground from "../components/GradientBackground";

function StandaloneCaliforniaCalculator() {
  const navigate = useNavigate();
  const [hourlyWage, setHourlyWage] = useState(20);
  const [hoursWorked, setHoursWorked] = useState(40);
  const [retirement401k, setRetirement401k] = useState(5);

  const grossIncome = hourlyWage * hoursWorked;

  const contribution401k = (grossIncome * retirement401k) / 100;

  const taxableIncome = grossIncome - contribution401k;

  const calculateCaliforniaTax = (income) => {
    if (income <= 10099) return income * 0.01;
    if (income <= 23942) return 100.99 + (income - 10099) * 0.02;
    if (income <= 37788) return 377.85 + (income - 23942) * 0.04;
    if (income <= 52455) return 931.69 + (income - 37788) * 0.06;
    if (income <= 66295) return 1811.71 + (income - 52455) * 0.08;
    if (income <= 338639) return 2918.91 + (income - 66295) * 0.093;
    if (income <= 406364) return 28246.9 + (income - 338639) * 0.103;
    if (income <= 677275) return 35222.58 + (income - 406364) * 0.113;
    return 65835.52 + (income - 677275) * 0.123;
  };

  const calculateFederalTax = (income) => {
    if (income <= 11000) return income * 0.1;
    if (income <= 44725) return 1100 + (income - 11000) * 0.12;
    if (income <= 95375) return 5147 + (income - 44725) * 0.22;
    if (income <= 182100) return 16290 + (income - 95375) * 0.24;
    if (income <= 231250) return 37104 + (income - 182100) * 0.32;
    if (income <= 578125) return 52832 + (income - 231250) * 0.35;
    return 174238.25 + (income - 578125) * 0.37;
  };

  const californiaTax = calculateCaliforniaTax(taxableIncome);
  const federalTax = calculateFederalTax(taxableIncome);

  const socialSecurityTax = Math.min(taxableIncome * 0.062, 9932.4);
  const medicareTax = taxableIncome * 0.0145;

  const totalTaxes =
    californiaTax + federalTax + socialSecurityTax + medicareTax;
  const netIncome = taxableIncome - totalTaxes;

  return (
    <GradientBackground>
      <div className="flex flex-col flex-grow">
        <Navbar />

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6 flex-grow">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            California Income Calculator
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Hourly Wage ($)
              </label>
              <input
                type="number"
                value={hourlyWage}
                onChange={(e) =>
                  setHourlyWage(Math.max(0, parseFloat(e.target.value) || 0))
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Hours Worked</label>
              <input
                type="number"
                value={hoursWorked}
                onChange={(e) =>
                  setHoursWorked(Math.max(0, parseFloat(e.target.value) || 0))
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">401(k) (%)</label>
              <input
                type="number"
                value={retirement401k}
                onChange={(e) =>
                  setRetirement401k(
                    Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                  )
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <ResultRow label="Gross Income:" value={grossIncome} />
                <ResultRow
                  label="401(k) Contribution:"
                  value={contribution401k}
                />
                <ResultRow label="California Tax:" value={californiaTax} />
              </div>
              <div>
                <ResultRow label="Federal Tax:" value={federalTax} />
                <ResultRow label="Social Security:" value={socialSecurityTax} />
                <ResultRow label="Medicare:" value={medicareTax} />
              </div>
            </div>

            <div className="border-t border-gray-300 pt-2 mt-2">
              <ResultRow
                label="Total Taxes:"
                value={totalTaxes}
                isBold={true}
              />
            </div>

            <div className="border-t border-gray-300 pt-2 mt-2">
              <ResultRow
                label="Net Income:"
                value={netIncome}
                isBold={true}
                isGreen={true}
              />
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

function ResultRow({ label, value, isBold = false, isGreen = false }) {
  return (
    <div className={`flex justify-between ${isBold ? "font-bold" : ""}`}>
      <span>{label}</span>
      <span className={isGreen ? "text-green-600" : ""}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}

export default StandaloneCaliforniaCalculator;
