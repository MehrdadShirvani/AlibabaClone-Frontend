import agent from "@/shared/api/agent";
import { TicketOrderSummaryDto } from "@/shared/models/transportation/TicketOrderSummaryDto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyTravels = () => {
  const [orders, setOrders] = useState<TicketOrderSummaryDto[]>([]);
  const navigate = useNavigate();

  const handleViewDetails = (ticketOrder: TicketOrderSummaryDto) => {
    navigate(`/profile/my-travels/${ticketOrder.id}`, {
      state: { ticketOrder },
    });
  };

  useEffect(() => {
    agent.Profile.getMyTravels().then(setOrders);
  }, []);

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  async function handleDownloadPdf(id: number) {
    setError(null);
    setLoading(true);
    try {
      const response = await agent.TicketOrder.downloadPdf(id);
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-${id}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url); // cleanup
    } catch (err) {
      console.error("Failed to download PDF:", err);
      setError("Failed to download ticket PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2
        className="text-xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        My Travels
      </h2>

      {orders.length === 0 ? (
        <div style={{ color: "var(--text-secondary)" }}>No travels found.</div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="p-4 rounded-lg shadow-sm space-y-2"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="font-semibold" style={{ color: "var(--primary)" }}>
              {order.vehicleName}
            </div>

            <div style={{ color: "var(--text-primary)" }}>
              <span>{order.fromCity}</span>{" "}
              <span style={{ color: "var(--border)" }}>→</span>{" "}
              <span>{order.toCity}</span> |{" "}
              <span>
                {new Date(order.travelStartDate).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Serial No:{" "}
              <span
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {order.serialNumber}
              </span>
              <span className="ml-4">
                Total Price:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--primary)" }}
                >
                  ${order.totalPrice.toLocaleString()}
                </span>
              </span>
            </div>

            <button
              onClick={() => handleViewDetails(order)}
              className="mt-2 px-4 py-1 mr-2 rounded transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Details of Order
            </button>
            <button
              onClick={() => handleDownloadPdf(order.id)}
              disabled={loading}
              className="mt-2 px-4 py-1 rounded transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {loading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyTravels;
