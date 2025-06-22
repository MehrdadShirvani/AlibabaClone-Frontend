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
                  style={{ color: "var(--accent)" }}
                >
                  {order.totalPrice.toLocaleString()} تومان
                </span>
              </span>
            </div>

            <button
              onClick={() => handleViewDetails(order)}
              className="mt-2 px-4 py-1 rounded transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Details of Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyTravels;
