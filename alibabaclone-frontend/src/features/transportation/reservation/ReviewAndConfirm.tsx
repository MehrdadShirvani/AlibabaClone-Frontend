import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { useReservationStore } from "@/store/useReservationStore";
import agent from "@/shared/api/agent";
import { useStepGuard } from "./StepGaurd";

export default function ReviewAndConfirmPage() {
  const { transportation, travelers, setCouponCode, setIsConfirmed } =
    useReservationStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"balance" | null>(
    "balance"
  );
  const [discountAmount, setDiscountAmount] = useState(0);

  const navigate = useNavigate();
  useStepGuard("review");

  const totalPrice = (transportation?.price || 0) * travelers.length;

  const handleApplyCoupon = async () => {
    try {
      const response = await agent.Coupon.validate({
        code: couponInput,
        originalPrice: totalPrice,
      });
      if (response.isValid) {
        setCouponCode(couponInput);
        setDiscountAmount(response.discountAmount);
        setCouponMessage("✅ Coupon Applied ");
      } else {
        setCouponCode(null);
        setDiscountAmount(0);
        setCouponMessage(`❌ ${response.message || "Coupon is not valid."}`);
      }
    } catch (err) {
      setCouponCode(null);
      setDiscountAmount(0);
      setCouponMessage("❌ Failed to validate coupon. Try again.");
      console.error("Coupon validation error:", err);
    }
  };

  async function handlePay(): Promise<void> {
    try {
      await agent.Profile.topUp({
        amount: totalPrice - discountAmount,
      });
      setIsConfirmed(true);
      navigate("/reserve/payment");
    } catch (error) {
      console.error("Failed to create ticket order:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-var-surface rounded-lg shadow-md">
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Review & Confirm
      </h2>

      {transportation && (
        <table
          className="w-full mb-8 border-collapse"
          style={{ borderSpacing: 0 }}
        >
          <tbody>
            {[
              ["From", transportation.fromCityTitle],
              ["To", transportation.toCityTitle],
              ["Date & Time", transportation.startDateTime.toLocaleString()],
              ["Company", transportation.companyTitle],
              ["Vehicle", transportation.vehicleTitle],
              ["Number of Travelers", travelers.length.toString()],
              ["Price per Seat", `$${transportation.price}`],
              ["Total Price", `$${totalPrice}`],
              ...(discountAmount > 0
                ? [
                    ["Discount", `-$${discountAmount.toFixed(2)}`],
                    [
                      "Total After Discount",
                      `$${(totalPrice - discountAmount).toFixed(2)}`,
                    ],
                  ]
                : []),
            ].map(([label, value]) => (
              <tr
                key={label}
                className="border-b border-var-border last:border-0"
              >
                <th
                  className="text-left py-3 pr-6 font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </th>
                <td className="py-3" style={{ color: "var(--text-primary)" }}>
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <section className="mb-8">
        <h3
          className="text-xl font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Travelers
        </h3>
        <ul className="list-disc pl-6 space-y-1 text-var-text-primary">
          {travelers.map((t, i) => (
            <li key={i} className="text-base">
              {t.firstName} {t.lastName} —{" "}
              <span className="font-mono">{t.idNumber}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Coupon
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-grow rounded-md border border-var-border px-3 py-2 text-var-text-primary focus:outline-none focus:ring-2 focus:ring-var-primary"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--text-primary)",
              borderColor: "var(--border)",
            }}
          />
          <Button onClick={handleApplyCoupon} className="whitespace-nowrap">
            Apply
          </Button>
        </div>
        {couponMessage && (
          <div
            className="text-sm mt-1"
            style={{ color: couponMessage.startsWith("✅") ? "green" : "red" }}
          >
            {couponMessage}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h3
          className="text-xl font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Payment Method
        </h3>
        <label className="flex items-center gap-2 text-var-text-primary cursor-pointer">
          <input
            type="radio"
            checked={paymentMethod === "balance"}
            onChange={() => setPaymentMethod("balance")}
            className="cursor-pointer"
          />
          Pay from Current Balance
        </label>
      </section>

      <div>
        <Button onClick={handlePay} className="w-full sm:w-auto">
          Pay and Reserve
        </Button>
      </div>
    </div>
  );
}
