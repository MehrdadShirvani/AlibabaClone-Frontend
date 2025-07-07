import api from "@/services/api";
import { TicketOrderSummaryDto } from "@/shared/models/transportation/TicketOrderSummaryDto";
import { TravelerTicketDto } from "@/shared/models/transportation/TravelerTicketDto";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TravelOrderDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketOrder: TicketOrderSummaryDto = location.state?.ticketOrder;

  const [activeTab, setActiveTab] = useState<"order" | "travelers">("order");
  const [travelers, setTravelers] = useState<TravelerTicketDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketOrder?.id) {
      setLoading(true);
      api.Profile.getTravelOrderDetails(ticketOrder.id)
        .then(setTravelers)
        .finally(() => setLoading(false));
    }
  }, [ticketOrder]);

  if (!ticketOrder) {
    return (
      <div className="p-6" style={{ color: "var(--destructive)" }}>
        No order selected.
      </div>
    );
  }

  return (
    <div
      className="p-6 space-y-6 rounded-lg shadow-sm mb-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <div
            className="text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Serial Number: {ticketOrder.serialNumber}
          </div>
          <div style={{ color: "var(--text-secondary)" }}>
            {ticketOrder.vehicleName} —{" "}
            {new Date(ticketOrder.travelStartDate).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 md:mt-0 px-4 py-2 rounded transition"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex space-x-6">
          {["order", "travelers"].map((tab) => {
            const label = tab === "order" ? "Order Details" : "Travelers";
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className="pb-2 font-medium transition"
                style={{
                  color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  borderBottom: isActive
                    ? "2px solid var(--primary)"
                    : "2px solid transparent",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === "order" && (
        <div className="space-y-2 text-sm md:text-base">
          {[
            ["From", ticketOrder.fromCity],
            ["To", ticketOrder.toCity],
            ["Company", ticketOrder.companyName],
            ["Total Price", `${ticketOrder.totalPrice.toLocaleString()} Toman`],
          ].map(([label, value]) => (
            <p key={label} style={{ color: "var(--text-primary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>{label}:</strong>{" "}
              {value}
            </p>
          ))}
          {ticketOrder.travelEndDate && (
            <p style={{ color: "var(--text-primary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>
                End Date:
              </strong>{" "}
              {new Date(ticketOrder.travelEndDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {activeTab === "travelers" && (
        <div className="overflow-x-auto">
          {loading ? (
            <p style={{ color: "var(--text-secondary)" }}>
              Loading traveler list...
            </p>
          ) : (
            <table
              className="min-w-full text-sm"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <thead style={{ backgroundColor: "var(--background)" }}>
                <tr>
                  {["Name", "Birth Date", "National ID", "Seat", "Status"].map(
                    (th) => (
                      <th
                        key={th}
                        className="text-left p-2"
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        {th}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {travelers.map((traveler) => (
                  <tr
                    key={traveler.id}
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <td className="p-2">{traveler.travelerName}</td>
                    <td className="p-2">
                      {new Date(traveler.birthDate).toLocaleDateString()}
                    </td>
                    <td className="p-2">{traveler.serialNumber}</td>
                    <td className="p-2">{traveler.seatNumber}</td>
                    <td className="p-2">{traveler.ticketStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelOrderDetailsPage;
