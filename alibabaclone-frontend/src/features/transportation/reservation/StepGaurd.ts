import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReservationStore } from "@/stores/useReservationStore";

export function useStepGuard(requiredStep: "travelers" | "review" | "payment" | "success") {
  const { transportation, travelers, currentStep, isConfirmed, isPayed } = useReservationStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (requiredStep === "travelers" && !transportation) {
        navigate("/");
    } else if (
      requiredStep === "review" &&
      (!transportation || travelers.length === 0)
    ) {
      navigate("/reserve/travelers");
    } else if (
      requiredStep === "payment" &&
      (!transportation || travelers.length === 0 || !isConfirmed)
    ) {
      navigate("/reserve/review");
    } else if (
      requiredStep === "success" &&
      (!transportation || travelers.length === 0 || !isPayed)
    ) {
      navigate("/reserve/payment");
    }
  }, [requiredStep, transportation, travelers, currentStep]);
}
