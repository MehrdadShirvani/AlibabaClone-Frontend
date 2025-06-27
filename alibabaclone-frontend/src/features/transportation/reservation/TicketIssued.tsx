import { useState } from "react";
import { Button } from "@/components/ui/button";
import agent from "@/shared/api/agent";
import { useReservationStore } from "@/store/useReservationStore";
import { useStepGuard } from "./StepGaurd";

export default function TicketIssued() {
  const { ticketOrderId } = useReservationStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useStepGuard("success");

  async function handleDownloadPdf() {
    setError(null);
    setLoading(true);
    try {
      const response = await agent.TicketOrder.downloadPdf(ticketOrderId);
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-${ticketOrderId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url); // cleanup

      useReservationStore().resetReservation();
    } catch (err) {
      console.error("Failed to download PDF:", err);
      setError("Failed to download ticket PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="max-w-md mx-auto p-6 bg-var-surface rounded-lg shadow-md text-center"
      style={{ color: "var(--text-primary)" }}
    >
      <h2 className="text-xl font-semibold mb-4">
        Your ticket has been issued!
      </h2>
      <p className="mb-6">Order ID: {ticketOrderId}</p>

      {error && (
        <div
          className="mb-4 p-3 rounded border border-red-500 text-red-700 bg-red-100"
          role="alert"
        >
          {error}
        </div>
      )}

      <Button onClick={handleDownloadPdf} disabled={loading} className="w-full">
        {loading ? "Downloading..." : "Download PDF"}
      </Button>
    </div>
  );
}
