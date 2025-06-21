import { Button } from "@/components/ui/button";
import agent from "@/shared/api/agent";
import { useReservationStore } from "@/store/useReservationStore";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
  const reservationStore = useReservationStore();
  const navigate = useNavigate();
  const { setTicketOrderId } = useReservationStore();
  async function handleNext(): Promise<void> {
    const tId: number = reservationStore.transportation?.id ?? 0;

    try {
      agent.TicketOrder.create({
        couponId: null,
        transportationId: tId,
        travelers: reservationStore.travelers,
      }).then((data) => {
        console.log("ticketOrder:" + data);
        setTicketOrderId(data);
        navigate("/reserve/success");
      });
    } catch (error) {
      console.error("Failed to create ticket order:", error);
      // Optionally show error to user here
    }
  }

  return (
    <>
      (<div>Payment has been done.</div>
      <div className="mt-6">
        <Button onClick={handleNext}>Next</Button>
      </div>
      )
    </>
  );
}
