import api from "@/services/api";
import { TicketOrderSummaryDto } from "@/shared/models/transportation/TicketOrderSummaryDto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyTravelsPage = () => {
  const [orders, setOrders] = useState<TicketOrderSummaryDto[]>([]);
  const navigate = useNavigate();

  const handleViewDetails = (ticketOrder: TicketOrderSummaryDto) => {
    navigate(`/profile/my-travels/${ticketOrder.id}`, {
      state: { ticketOrder },
    });
  };

  useEffect(() => {
    api.Profile.getMyTravels().then(setOrders);
  }, []);

  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  async function handleDownloadPdf(id: number) {
    setError(null);
    setId(id);
    setLoading(true);
    try {
      const response = await api.TicketOrder.downloadPdf(id);
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
      setId(0);
    }
  }

  return (
    <div
      className="rounded-lg shadow-md p-6 mb-6"
      style={{ border: "1px solid var(--border)" }}
    >
      <h2
        className="text-xl font-semibold mb-6"
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
            className="p-4 mb-4 rounded-lg shadow-sm space-y-2"
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
              {loading && id === order.id ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyTravelsPage;
