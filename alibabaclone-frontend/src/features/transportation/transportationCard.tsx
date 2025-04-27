import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import React from "react";

interface Props {
  transportation: TransportationSearchResult;
}

const TransportationCard: React.FC<Props> = ({ transportation }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md shadow-md mb-4">
      {/* Price and Select Button */}
      <div className="flex flex-col items-center">
        <div className="text-blue-600 font-bold text-lg">
          {transportation.price} Toman
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">
          Select Ticket
        </button>
      </div>

      {/* Trip Info */}
      <div className="flex-1 mx-4 text-center">
        <div className="font-semibold text-gray-700">
          {transportation.companyTitle}
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="mx-2">{transportation.fromCityTitle}</div>
          <span className="text-gray-400">→</span>
          <div className="mx-2">{transportation.toCityTitle}</div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {new Date(transportation.startDateTime).toLocaleDateString("en", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Company Logo or Placeholder */}
      <div className="w-12 h-12">
        <img
          src="/images/company-placeholder.png"
          alt="company"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default TransportationCard;
