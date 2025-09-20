import React from "react";
import { CheckCircle2, Circle } from "lucide-react"; // modern icons
import styles from "../../style/style";

const steps = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Success" },
];

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[95%] md:w-[60%] flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            {/* Step Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                active >= step.id
                  ? "bg-pink-500 border-pink-500 text-white shadow-lg"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            >
              {active > step.id ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>

            {/* Step Label */}
            <span
              className={`mt-2 text-sm font-medium ${
                active >= step.id ? "text-pink-600" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-6 left-[calc(33%+0.5rem)] w-[33%] h-[3px] transition-all duration-300 ${
                  active > step.id ? "bg-pink-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
