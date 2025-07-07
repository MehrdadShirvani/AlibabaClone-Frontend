import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";
import api from "@/services/api";
import { TransactionDto } from "@/shared/models/transaction/TransactionDto";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  const loadCurrentBalance = async () => {
    try {
      const data = await api.Profile.getProfile();
      setCurrentBalance(data.currentBalance);
    } catch (err) {
      console.error("Failed to load current balance", err);
    }
  };

  useEffect(() => {
    api.Profile.getMyTransactions().then(setTransactions);
    loadCurrentBalance();
  }, []);

  const handleAddBalance = () => {
    //TODO: Simulate a balance update call here
    setShowModal(false);
    alert(`Balance increased by ${topUpAmount}`);
    setTopUpAmount("");
  };

  return (
    <div
      className="max-w-4xl mx-auto mt-6 p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-semibold">
          Current Balance:{" "}
          <span style={{ color: "var(--primary)" }}>{currentBalance} $</span>
        </div>
        <Button onClick={() => setShowModal(true)}>Increase Balance</Button>
      </div>

      <div
        className="overflow-x-auto rounded-lg shadow-sm"
        style={{ border: "1px solid var(--border)" }}
      >
        <table className="w-full table-auto border-collapse">
          <thead
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text-primary)",
            }}
          >
            <tr>
              {["Date", "Type", "Amount", "Description"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-semibold"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr
                key={t.id}
                className="transition-colors duration-200 hover:bg-[var(--primary-hover)]/10"
                style={{
                  backgroundColor:
                    idx % 2 === 0 ? "var(--background)" : "var(--surface)",
                }}
              >
                <td
                  className="px-6 py-3 whitespace-nowrap"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {format(new Date(t.createdAt), "yyyy/MM/dd HH:mm")}
                </td>
                <td
                  className="px-6 py-3 whitespace-nowrap"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {t.transactionType}
                </td>
                <td
                  className="px-6 py-3 font-semibold whitespace-nowrap"
                  style={{
                    borderBottom: "1px solid var(--border)",
                    color:
                      t.transactionTypeId === 1
                        ? "#22c55e" /* green-500 */
                        : "#ef4444" /* red-500 */,
                  }}
                >
                  {t.transactionTypeId === 1 ? "+" : "-"}$
                  {t.finalAmount.toLocaleString()}
                </td>
                <td
                  className="px-6 py-3"
                  style={{
                    borderBottom: "1px solid var(--border)",
                    color: "var(--secondary)",
                  }}
                >
                  {t.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content space-y-4">
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Increase Balance
            </h2>
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="input"
              placeholder="Enter amount"
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--text-primary)",
                borderColor: "var(--border)",
              }}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="button-secondary"
                onClick={() => setShowModal(false)}
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Cancel
              </button>
              <button
                className="button-primary"
                onClick={handleAddBalance}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
