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
  const vehicleTitle = ["Bus", "Train", "Airplane"].at(
    transportation.vehicleTypeId - 1
  );
  const handleSelectTransportation = () => {
    setTransportationId(transportation);
    navigate("/reserve/travelers");
  };

  const formattedDate = new Date(transportation.startDateTime).toLocaleString(
    "en",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  const formattedArrivingDate = transportation.endDateTime
    ? new Date(transportation.endDateTime).toLocaleString("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";
  return (
    <div
      className="p-6 rounded-2xl transition-shadow duration-300 mb-4 w-full shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <div className="flex justify-between gap-6 flex-wrap">
        {/* From Section */}
        <div className="flex flex-col min-w-[240px] flex-1">
          <div className="text-lg font-bold ">
            {transportation.fromCityTitle}
          </div>

          <div className="flex items-center text-sm mt-1 text-gray-400">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 20s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10zM8 9a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
            {transportation.fromLocationTitle}
          </div>

          <div className="flex items-center mt-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 7h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
              />
            </svg>
            <span>Departure</span>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <span>{formattedDate}</span>
          </div>
        </div>
        <span className="mx-2" style={{ color: "var(--primary)" }}>
          →
        </span>
        {/* To Section */}
        <div className="flex flex-col min-w-[240px] flex-1">
          <div className="text-lg font-bold">{transportation.toCityTitle}</div>

          <div className="flex items-center text-sm mt-1 text-gray-400">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 20s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10zM8 9a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
            {transportation.toLocationTitle}
          </div>

          <div className="flex items-center mt-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 7h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
              />
            </svg>

            <span>Arrival</span>
          </div>
          <div className="flex items-center mt-2 text-sm">
            {formattedArrivingDate}
          </div>
        </div>

        {/* Action Section: Price & Button */}

        <div className="text-center min-w-[160px] flex flex-col items-center justify-between">
          <div
            className="font-bold text-2xl mb-2"
            style={{ color: "var(--primary)" }}
          >
            ${transportation.price.toLocaleString()}
          </div>

          <button
            onClick={handleSelectTransportation}
            className="button-primary text-sm w-full"
            style={{ backgroundColor: "var(--primary)" }}
            type="button"
          >
            Select Transportation
          </button>

          <div
            className="text-ms mt-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {transportation.remainingCapacity} seats left
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2 text-sm pt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 21h18M6 21V5a1 1 0 011-1h10a1 1 0 011 1v16M9 10h.01M9 14h.01M9 18h.01M15 10h.01M15 14h.01M15 18h.01"
          />
        </svg>

        {transportation.companyTitle}
      </div>
      {/* Bottom Info Links */}
      <div className="mt-4 border-t pt-3 text-sm flex justify-center gap-6 flex-wrap">
        {[vehicleTitle + " Info", "Refund Policy", "Seat Map"].map((label) => (
          <span
            key={label}
            className="underline cursor-pointer"
            style={{ color: "var(--primary)" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TransportationCard;
