import agent from "@/shared/api/agent";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  profile: ProfileDto;
  onProfileUpdated: () => void;
}

const PersonalInformation: React.FC<Props> = ({
  profile,
  onProfileUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // react-hook-form setup
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      idNumber: profile.idNumber,
      emergencyPhoneNumber: profile.personPhoneNumber,
      birthDate: profile.birthDate ? profile.birthDate.split("T")[0] : "", // Format for input[type=date]
    },
  });

  // On clicking edit button: switch to edit mode and reset form values
  const onEditClick = () => {
    reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      idNumber: profile.idNumber,
      emergencyPhoneNumber: profile.personPhoneNumber,
      birthDate: profile.birthDate ? profile.birthDate.split("T")[0] : "",
    });
    setIsEditing(true);
  };

  // On cancel, exit edit mode without saving
  const onCancel = () => {
    setIsEditing(false);
  };

  // On save, send data to API and refresh profile
  const onSubmit = async (data: any) => {
    try {
      await agent.Profile.upsertAccountPerson({
        ...data,
        // Include any required fixed fields here if needed
      });
      setIsEditing(false);
      onProfileUpdated();
    } catch (error) {
      console.error("Failed to update personal info", error);
      alert("Failed to update personal information.");
    }
  };

  return (
    <section className="p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <label className="font-semibold">First and Last Name:</label>
            <p>
              {profile.firstName} {profile.lastName}
            </p>
          </div>
          <div>
            <label className="font-semibold">National ID:</label>
            <p>{profile.idNumber}</p>
          </div>
          <div>
            <label className="font-semibold">Emergency Phone Number:</label>
            <p>{profile.personPhoneNumber || "-"}</p>
          </div>
          <div>
            <label className="font-semibold">Birth Date:</label>
            <p>
              {profile.birthDate
                ? new Date(profile.birthDate).toLocaleDateString()
                : "-"}
            </p>
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
          <div className="col-span-1">
            <label className="block font-semibold mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: "First Name is required" })}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-semibold mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName", { required: "Last Name is required" })}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-semibold mb-1" htmlFor="idNumber">
              National ID
            </label>
            <input
              id="idNumber"
              {...register("idNumber", {
                required: "National ID is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "National ID must be exactly 10 digits",
                },
              })}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block font-semibold mb-1"
              htmlFor="emergencyPhoneNumber"
            >
              Emergency Phone Number
            </label>
            <input
              id="emergencyPhoneNumber"
              {...register("emergencyPhoneNumber")}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-semibold mb-1" htmlFor="birthDate">
              Birth Date
            </label>
            <input
              id="birthDate"
              type="date"
              {...register("birthDate", { required: "Birth Date is required" })}
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

export default PersonalInformation;
