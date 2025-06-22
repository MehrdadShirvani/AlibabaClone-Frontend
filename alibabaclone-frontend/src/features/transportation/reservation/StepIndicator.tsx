import React from "react";

interface Props {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<Props> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        return (
          <div key={index} className="flex-1 text-center">
            <div
              className="text-sm font-medium"
              style={{
                color: isActive ? "var(--primary)" : "var(--text-secondary)",
              }}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className="mx-2 mt-1 border-t-2"
                style={{
                  borderColor: isActive ? "var(--primary)" : "var(--border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
