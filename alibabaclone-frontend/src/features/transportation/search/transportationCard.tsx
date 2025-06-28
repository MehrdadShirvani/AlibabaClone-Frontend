import React, { useState } from "react";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import { useReservationStore } from "@/store/useReservationStore";
import { useNavigate } from "react-router-dom";
import { transportationSeatDto } from "@/shared/models/transportation/transportationSeatDto";
import agent from "@/shared/api/agent";
import { Trophy } from "lucide-react";
import ReadOnlySeatMap from "../reservation/ReadOnlySeatMap";

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

  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = async (tab: string) => {
    setActiveTab(tab === activeTab ? null : tab);
    if (tab === "Seat Map" && seats === null) {
      setLoadingSeats(true);
      try {
        const result = await agent.TransportationSearch.getSeats(
          transportation.id
        );
        setSeats(result);
      } catch {
        setSeats(null);
        alert("Something went wrong. try again later.");
      } finally {
        setLoadingSeats(false);
      }
    }
  };

  const [seats, setSeats] = useState<transportationSeatDto[] | null>(null);
  const [loadingSeats, setLoadingSeats] = useState(false);

  return (
    <div
      className="p-6 rounded-2xl transition-shadow duration-300 mb-4 w-full shadow-sm relative"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      }}
    >
      {/* Main Info */}
      <div className="flex justify-between gap-6 flex-wrap">
        {/* From */}
        <div className="flex flex-col min-w-[240px] flex-1">
          <div className="text-lg font-bold">
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
          <div className="flex items-center mt-2 text-sm">{formattedDate}</div>
        </div>

        {/* Arrow */}
        <span className="mx-2" style={{ color: "var(--primary)" }}>
          →
        </span>

        {/* To */}
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

        {/* Price & Button */}
        <div className="text-center min-w-[160px] flex flex-col items-center justify-between">
          <div
            className="font-bold text-2xl mb-2"
            style={{ color: "var(--primary)" }}
          >
            ${transportation.price.toLocaleString()}
          </div>

          <button
            onClick={handleSelectTransportation}
            disabled={transportation.remainingCapacity === 0}
            className={`button-primary text-sm w-full ${
              transportation.remainingCapacity === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            style={{ backgroundColor: "var(--primary)" }}
            type="button"
          >
            Select Transportation
          </button>

          <div
            className="text-ms mt-2"
            style={{
              color:
                transportation.remainingCapacity === 0
                  ? "var(--danger)"
                  : "var(--text-secondary)",
            }}
          >
            {transportation.remainingCapacity === 0
              ? "Sold out"
              : `${transportation.remainingCapacity} seats left`}
          </div>
        </div>
      </div>

      {/* Company */}
      <div className="flex items-center mt-2 text-sm pt-3">
        <img
          src={`/images/companyLogos/${transportation.companyTitle}.jpg`}
          alt="Company Logo"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        {transportation.companyTitle}
      </div>

      {/* Bottom Tab Links */}
      <div className="mt-4 border-t pt-3 text-sm flex justify-center gap-6 flex-wrap">
        {["Refund Policy", vehicleTitle == "Bus" ? "Seat Map" : ""].map(
          (label) => (
            <span
              key={label}
              className={`cursor-pointer ${
                activeTab === label ? "font-semibold" : ""
              }`}
              style={{ color: "var(--primary)" }}
              onClick={() => handleTabClick(label)}
            >
              {label}
            </span>
          )
        )}
      </div>

      {/* Tab Panel */}
      {activeTab && (
        <div
          className="mt-6 p-4 rounded-b-xl text-sm border-t"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        >
          {activeTab === "Refund Policy" ? (
            <div className="flex gap-4 justify-between flex-wrap">
              <div
                className="flex-1 p-4 rounded-lg shadow"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  More than 1 hour before departure
                </div>
                <div
                  className="text-sm mt-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  90% refund available
                </div>
              </div>
              <div
                className="flex-1 p-4 rounded-lg shadow"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--destructive)" }}
                >
                  Less than 1 hour before departure
                </div>
                <div
                  className="text-sm mt-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  50% refund available
                </div>
              </div>
            </div>
          ) : loadingSeats ? (
            <div className="flex justify-center py-8">
              <div
                className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
                style={{ borderColor: "var(--secondary)" }}
              ></div>
            </div>
          ) : seats ? (
            <ReadOnlySeatMap seats={seats} />
          ) : null}

          {/* Close Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setActiveTab(null)}
              className="px-6 py-2 text-sm rounded-full hover:opacity-80"
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportationCard;
