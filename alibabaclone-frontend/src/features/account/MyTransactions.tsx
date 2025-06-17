import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import agent from "@/shared/api/agent";
import { TransactionDto } from "@/shared/models/transaction/TransactionDto";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  const loadCurrentBalance = async () => {
    try {
      const data = await agent.Profile.getProfile();
      setCurrentBalance(data.currentBalance);
    } catch (err) {
      console.error("Failed to load current balance", err);
    }
  };

  useEffect(() => {
    agent.Profile.getMyTransactions().then(setTransactions);
    loadCurrentBalance();
  }, []);

  const handleAddBalance = () => {
    //TODO: Simulate a balance update call here
    setShowModal(false);
    alert(`Balance increased by ${topUpAmount}`);
    setTopUpAmount("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">
          Current Balance:{" "}
          <span className="text-blue-600">{currentBalance} $</span>
        </div>
        <Button onClick={() => setShowModal(true)}>Increase Balance</Button>
      </div>

      <div className="overflow-x-auto shadow-md rounded">
        <table className="table-base w-full">
          <thead>
            <tr>
              <th className="table-th">Date</th>
              <th className="table-th">Type</th>
              <th className="table-th">Amount</th>
              <th className="table-th">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="table-td">
                  {format(new Date(t.createdAt), "yyyy/MM/dd HH:mm")}
                </td>
                <td className="table-td">{t.transactionType}</td>
                <td
                  className={cn(
                    "table-td font-semibold",
                    t.transactionTypeId === 1
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {t.transactionTypeId === 1 ? "+" : "-"}
                  {t.finalAmount.toLocaleString()} تومان
                </td>
                <td className="table-td">{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content space-y-4">
            <h2 className="text-lg font-semibold">Increase Balance</h2>
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="input"
              placeholder="Enter amount"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="button-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="button-primary" onClick={handleAddBalance}>
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
