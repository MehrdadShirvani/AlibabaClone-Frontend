import agent from "@/shared/api/agent";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  profile: ProfileDto;
  onProfileUpdated: () => void;
}

const BankAccountDetails: React.FC<Props> = ({ profile, onProfileUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      iban: profile.iban || "",
      cardNumber: profile.cardNumber || "",
      bankAccountNumber: profile.bankAccountNumber || "",
    },
  });

  const onEditClick = () => {
    reset({
      iban: profile.iban || "",
      cardNumber: profile.cardNumber || "",
      bankAccountNumber: profile.bankAccountNumber || "",
    });
    setIsEditing(true);
  };

  const onCancel = () => setIsEditing(false);

  const onSubmit = async (data: any) => {
    try {
      await agent.Profile.upsertBankDetail(data);
      setIsEditing(false);
      onProfileUpdated();
    } catch (error) {
      console.error("Failed to update bank details", error);
      alert("Failed to update bank details.");
    }
  };

  return (
    <section
      className="p-6 rounded-lg shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Bank Account Details
      </h2>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Read-only view */}
          {[
            { label: "IBAN", value: profile.iban },
            { label: "Card Number", value: profile.cardNumber },
            { label: "Bank Account Number", value: profile.bankAccountNumber },
          ].map((field) => (
            <div key={field.label}>
              <label
                className="font-semibold block mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {field.label}:
              </label>
              <p style={{ color: "var(--text-primary)" }}>
                {field.value || "-"}
              </p>
            </div>
          ))}

          <div className="col-span-2 mt-4">
            <button
              onClick={onEditClick}
              className="px-4 py-2 rounded"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Edit form */}
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="iban"
              style={{ color: "var(--text-secondary)" }}
            >
              IBAN
            </label>
            <input
              id="iban"
              {...register("iban", {
                required: "IBAN is required",
                pattern: {
                  value: /^[A-Z0-9]{24}$/,
                  message: "IBAN must be 24 alphanumeric characters",
                },
              })}
              className="border rounded px-2 py-1 w-full"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="cardNumber"
              style={{ color: "var(--text-secondary)" }}
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              {...register("cardNumber", {
                required: "Card Number is required",
                pattern: {
                  value: /^(\d{4}-?){3}\d{4}$/,
                  message: "Card Number must be 16 digits (hyphens optional)",
                },
              })}
              className="border rounded px-2 py-1 w-full"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div className="col-span-2">
            <label
              className="block font-semibold mb-1"
              htmlFor="bankAccountNumber"
              style={{ color: "var(--text-secondary)" }}
            >
              Bank Account Number
            </label>
            <input
              id="bankAccountNumber"
              {...register("bankAccountNumber")}
              className="border rounded px-2 py-1 w-full"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div className="col-span-2 flex space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default BankAccountDetails;
