import React from "react";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";

interface Props {
  transportation: TransportationSearchResult;
}

const TransportationCard: React.FC<Props> = ({ transportation }) => {
  const formattedDate = new Date(transportation.startDateTime).toLocaleString(
    "en",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full mb-4">
      {/* Left Side: Price and Button */}
      <div className="text-center px-4 min-w-[140px]">
        <div className="text-blue-600 font-bold text-xl mb-2">
          {transportation.price.toLocaleString()} Toman
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded transition">
          Select Ticket
        </button>
        <div className="text-xs text-gray-500 mt-2">? seats left</div>
      </div>

      {/* Middle Section: Route and Info */}
      <div className="flex-1 text-center px-4">
        <div className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded mb-1">
          {/* VIP ({transportation.vehicleName || "Bus"}) */}
        </div>
        <div className="text-lg text-gray-700 font-semibold">
          {transportation.fromCityTitle}
          <span className="mx-2 text-gray-400">→</span>
          {transportation.toCityTitle}
        </div>
        <div className="mt-2 text-sm text-blue-600 space-x-4 underline cursor-pointer">
          <span>Bus Info</span>
          <span>Refund Policy</span>
          <span>Seat Map</span>
        </div>
      </div>

      {/* Right Side: Company Logo and Time */}
      <div className="flex flex-col items-end px-4 text-right min-w-[120px]">
        <div className="text-gray-800 font-semibold text-sm mb-1">
          {transportation.companyTitle}
        </div>
        <div className="text-2xl font-bold text-black mb-2">
          {formattedDate}
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
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
