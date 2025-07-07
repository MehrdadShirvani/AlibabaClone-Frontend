import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import StepIndicator from "../components/StepIndicator";

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

export default function ReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = stepRoutes.indexOf(location.pathname);

  return (
    <div
      className="p-6 mx-auto rounded-lg shadow-md"
      style={{
        width: "900px", // or any fixed size you want
        backgroundColor: "var(--surface)",
        color: "var(--text-primary)",
      }}
    >
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
