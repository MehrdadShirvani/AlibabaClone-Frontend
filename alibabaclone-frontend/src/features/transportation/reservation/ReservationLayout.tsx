import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StepIndicator from "./StepIndicator";

const steps = [
  //   "Select Transportation",
  "Traveler Details",
  "Review",
  "Payment",
  "Ticket Issued",
];

const stepRoutes = [
  //   "/reserve/select",
  "/reserve/travelers",
  "/reserve/review",
  "/reserve/payment",
  "/reserve/success",
];

export default function ReservationLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = stepRoutes.indexOf(location.pathname);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />
      <div className="mt-6">
        <Outlet />
      </div>
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={() => navigate(stepRoutes[currentStep - 1])}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
