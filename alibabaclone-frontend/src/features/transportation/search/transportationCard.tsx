import React from "react";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import { useReservationStore } from "@/store/useReservationStore";
import { useNavigate } from "react-router-dom";

interface Props {
  transportation: TransportationSearchResult;
}

const TransportationCard: React.FC<Props> = ({ transportation }) => {
  const setTransportationId = useReservationStore(
    (state) => state.setTransportation
  );
  const navigate = useNavigate();

  const handleSelectTransportation = () => {
    setTransportationId(transportation);
    navigate("/reserve/travelers");
  };

  const formattedDate = new Date(transportation.startDateTime).toLocaleString(
    "en",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  return (
    <div
      className="flex items-center justify-between p-4 rounded-2xl transition-shadow duration-300 mb-4 w-full"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Left Side: Price and Button */}
      <div
        className="text-center px-4 min-w-[140px]"
        style={{ color: "var(--text-primary)" }}
      >
        <div
          className="font-bold text-xl mb-2"
          style={{ color: "var(--primary)" }}
        >
          {transportation.price.toLocaleString()} Toman
        </div>

        <button
          onClick={handleSelectTransportation}
          className="button-primary text-sm"
          type="button"
        >
          Select Ticket
        </button>

        <div
          className="text-xs mt-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {transportation.remainingCapacity} seats left
        </div>
      </div>

      {/* Middle Section: Route and Info */}
      <div className="flex-1 text-center px-4">
        <div
          className="inline-block px-2 py-1 rounded mb-1 text-xs"
          style={{
            backgroundColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          {/* e.g. VIP */}
        </div>
        <div
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {transportation.fromCityTitle}
          <span className="mx-2" style={{ color: "var(--border)" }}>
            →
          </span>
          {transportation.toCityTitle}
        </div>
        <div className="mt-2 text-sm space-x-4 underline cursor-pointer">
          {["Bus Info", "Refund Policy", "Seat Map"].map((label) => (
            <span key={label} style={{ color: "var(--primary)" }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Right Side: Company Logo and Time */}
      <div className="flex flex-col items-end px-4 text-right min-w-[120px]">
        <div
          className="font-semibold text-sm mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {transportation.companyTitle}
        </div>
        <div
          className="font-bold text-2xl mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {formattedDate}
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--border)" }}
        >
          <img
            src="/images/company-placeholder.png"
            alt="Company Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TransportationCard;
