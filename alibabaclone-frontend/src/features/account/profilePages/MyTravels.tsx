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
      <h2 className="text-xl font-semibold">My Travels</h2>
      {orders.length === 0 ? (
        <div>No travels found.</div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm space-y-2 bg-white"
          >
            <div className="text-blue-600 font-semibold">
              {order.vehicleName}
            </div>

            <div className="text-gray-700">
              <span>{order.fromCity}</span> &rarr; <span>{order.toCity}</span> |{" "}
              <span>
                {new Date(order.travelStartDate).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Serial No:{" "}
              <span className="font-medium">{order.serialNumber}</span>
              <span className="ml-4">
                Total Price:{" "}
                <span className="text-black font-semibold">
                  {order.totalPrice.toLocaleString()} تومان
                </span>
              </span>
            </div>

            <button
              onClick={() => handleViewDetails(order)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
