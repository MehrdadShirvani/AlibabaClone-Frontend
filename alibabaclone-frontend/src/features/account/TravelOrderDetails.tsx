import agent from "@/shared/api/agent";
import { TicketOrderSummaryDto } from "@/shared/models/transportation/TicketOrderSummaryDto";
import { TravelerTicketDto } from "@/shared/models/transportation/TravelerTicketDto";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TravelOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketOrder: TicketOrderSummaryDto = location.state?.ticketOrder;

  const [activeTab, setActiveTab] = useState<"order" | "travelers">("order");
  const [travelers, setTravelers] = useState<TravelerTicketDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketOrder?.id) {
      setLoading(true);
      agent.Profile.getTravelOrderDetails(ticketOrder.id)
        .then(setTravelers)
        .finally(() => setLoading(false));
    }
  }, [ticketOrder]);

  if (!ticketOrder) {
    return <div className="p-6 text-red-500">No order selected.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <div className="text-lg font-semibold">
            Serial Number: {ticketOrder.serialNumber}
          </div>
          <div className="text-gray-600">
            {ticketOrder.vehicleName} —{" "}
            {new Date(ticketOrder.travelStartDate).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ← Back
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300">
        <div className="flex space-x-6">
          <button
            className={`pb-2 font-medium border-b-2 ${
              activeTab === "order"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("order")}
          >
            Order Details
          </button>
          <button
            className={`pb-2 font-medium border-b-2 ${
              activeTab === "travelers"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("travelers")}
          >
            Travelers
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "order" && (
        <div className="space-y-2 text-sm md:text-base">
          <p>
            <strong>From:</strong> {ticketOrder.fromCity}
          </p>
          <p>
            <strong>To:</strong> {ticketOrder.toCity}
          </p>
          <p>
            <strong>Company:</strong> {ticketOrder.companyName}
          </p>
          <p>
            <strong>Total Price:</strong>{" "}
            {ticketOrder.totalPrice.toLocaleString()} Toman
          </p>
          {ticketOrder.travelEndDate && (
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(ticketOrder.travelEndDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {activeTab === "travelers" && (
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading traveler list...</p>
          ) : (
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border-b">Name</th>
                  <th className="text-left p-2 border-b">Birth Date</th>
                  <th className="text-left p-2 border-b">National ID</th>
                  <th className="text-left p-2 border-b">Seat</th>
                  <th className="text-left p-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {travelers.map((traveler) => (
                  <tr key={traveler.id} className="border-t">
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

export default TravelOrderDetails;
