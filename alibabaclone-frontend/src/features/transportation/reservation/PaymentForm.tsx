import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import api from "@/services/api";
import { useReservationStore } from "@/stores/useReservationStore";
import { useNavigate } from "react-router-dom";
import { useStepGuard } from "./StepGaurd";

export default function PaymentForm() {
  const reservationStore = useReservationStore();
  const navigate = useNavigate();
  const { setTicketOrderId, setIsPayed } = useReservationStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useStepGuard("payment");

  async function handleFinalizeReservation(): Promise<void> {
    setError(null);
    setLoading(true);

    const transportationId = reservationStore.transportation?.id ?? 0;

    try {
      const ticketOrderId = await api.TicketOrder.create({
        couponCode: reservationStore.couponCode,
        transportationId,
        travelers: reservationStore.travelers,
      });

      setIsPayed(true);
      setTicketOrderId(ticketOrderId);
      navigate("/reserve/success");
    } catch (err) {
      console.error("Failed to create ticket order:", err);
      setError("Failed to finalize reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-var-surface rounded-lg shadow-md">
      <p
        className="text-lg font-medium mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Payment has been completed.
      </p>

      {error && (
        <div
          className="mb-4 p-3 rounded border border-red-500 text-red-700 bg-red-100"
          role="alert"
        >
          {error}
        </div>
      )}

      <Button
        onClick={handleFinalizeReservation}
        disabled={loading}
        className="w-full"
        variant="default"
      >
        {loading ? "Finalizing..." : "Finalize Reservation"}
      </Button>
    </div>
  );
}
