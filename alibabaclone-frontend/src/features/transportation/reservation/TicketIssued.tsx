import { Button } from "@/components/ui/button";
import agent from "@/shared/api/agent";
import { useReservationStore } from "@/store/useReservationStore";

export default function TicketIssued() {
  const { ticketOrderId } = useReservationStore();
  async function handleNext() {
    try {
      const response = await agent.TicketOrder.downloadPdf(ticketOrderId);
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-${ticketOrderId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url); // cleanup
      // const blob = new Blob([response.data], { type: "application/pdf" });
      // const url = window.URL.createObjectURL(blob);

      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `ticket-${ticketOrderId}.pdf`;
      // a.click();
      // window.URL.revokeObjectURL(url); // cleanup
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  }

  return (
    <div>
      Your ticket has been issued! {ticketOrderId}
      <div className="mt-6">
        <Button onClick={handleNext}>Download PDF</Button>
      </div>
    </div>
  );
}
