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

  const onCancel = () => {
    setIsEditing(false);
  };

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
    <section className="p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Bank Account Details</h2>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <label className="font-semibold">IBAN:</label>
            <p>{profile.iban || "-"}</p>
          </div>
          <div>
            <label className="font-semibold">Card Number:</label>
            <p>{profile.cardNumber || "-"}</p>
          </div>
          <div>
            <label className="font-semibold">Bank Account Number:</label>
            <p>{profile.bankAccountNumber || "-"}</p>
          </div>
          <div className="col-span-2">
            <button
              onClick={onEditClick}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
          <div>
            <label className="block font-semibold mb-1" htmlFor="iban">
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
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="cardNumber">
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
            />
          </div>
          <div className="col-span-2">
            <label
              className="block font-semibold mb-1"
              htmlFor="bankAccountNumber"
            >
              Bank Account Number
            </label>
            <input
              id="bankAccountNumber"
              {...register("bankAccountNumber")}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="col-span-2 flex space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
