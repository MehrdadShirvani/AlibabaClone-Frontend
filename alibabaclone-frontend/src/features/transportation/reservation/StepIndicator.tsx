import React from "react";

interface Props {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<Props> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`text-sm font-medium ${
              index === currentStep ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && <div className="border-t-2 mx-2 mt-1" />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
