// src/pages/ReviewAndConfirmPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useReservationStore } from "@/store/useReservationStore";
import agent from "@/shared/api/agent";

interface TransportationDetails {
  fromCity: string;
  toCity: string;
  departingDateTime: string;
  companyName: string;
  vehicleName: string;
  pricePerSeat: number;
}

export default function ReviewAndConfirmPage() {
  const { transportation, travelers, couponCode, setCouponCode } =
    useReservationStore();
  useState<TransportationDetails | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"balance" | null>(
    "balance"
  );
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    setCouponCode(couponInput);
    alert("Coupon applied (validate in backend on final submit)");
  };

  async function handlePay(): Promise<void> {
    try {
      await agent.Profile.topUp({
        amount: totalPrice,
      });
      navigate("/reserve/payment");
    } catch (error) {
      console.error("Failed to create ticket order:", error);
      // Optionally show error to user here
    }
  }

  const totalPrice = (transportation?.price || 0) * travelers.length;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>

      {transportation && (
        <table className="w-full text-left border mb-6">
          <tbody>
            <tr>
              <th>From</th>
              <td>{transportation.fromCityTitle}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{transportation.toCityTitle}</td>
            </tr>
            <tr>
              <th>Date & Time</th>
              <td>{transportation.startDateTime.toLocaleString()}</td>
            </tr>
            <tr>
              <th>Company</th>
              <td>{transportation.companyTitle}</td>
            </tr>
            <tr>
              <th>Vehicle</th>
              <td>{transportation.companyTitle}</td>
            </tr>
            <tr>
              <th>Number of Travelers</th>
              <td>{travelers.length}</td>
            </tr>
            <tr>
              <th>Price per Seat</th>
              <td>{transportation.price} $</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td>{totalPrice} $</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Travelers</h3>
        <ul className="list-disc pl-6">
          {travelers.map((t, i) => (
            <li key={i}>
              {t.firstName} {t.lastName} - {t.idNumber}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Coupon</h3>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
        />
        <Button onClick={handleApplyCoupon} className="ml-2">
          Apply
        </Button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Payment Method</h3>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "balance"}
            onChange={() => setPaymentMethod("balance")}
          />
          Pay from Current Balance
        </label>
      </div>

      <div>
        <Button onClick={handlePay}>Pay and Reserve</Button>
      </div>
    </div>
  );
}
