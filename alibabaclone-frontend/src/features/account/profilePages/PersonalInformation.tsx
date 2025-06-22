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

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      idNumber: profile.idNumber,
      emergencyPhoneNumber: profile.personPhoneNumber,
      birthDate: profile.birthDate ? profile.birthDate.split("T")[0] : "",
    },
  });

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

  const onCancel = () => {
    setIsEditing(false);
  };

  const onSubmit = async (data: any) => {
    try {
      await agent.Profile.upsertAccountPerson(data);
      setIsEditing(false);
      onProfileUpdated();
    } catch (error) {
      console.error("Failed to update personal info", error);
      alert("Failed to update personal information.");
    }
  };

  return (
    <section
      className="p-6 mb-6 rounded-lg shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Personal Information
      </h2>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "First and Last Name",
              value: `${profile.firstName} ${profile.lastName}`,
            },
            { label: "National ID", value: profile.idNumber },
            {
              label: "Emergency Phone Number",
              value: profile.personPhoneNumber || "-",
            },
            {
              label: "Birth Date",
              value: profile.birthDate
                ? new Date(profile.birthDate).toLocaleDateString()
                : "-",
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <label
                className="font-semibold block mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}:
              </label>
              <p style={{ color: "var(--text-primary)" }}>{value}</p>
            </div>
          ))}

          <div className="col-span-2 mt-4">
            <button
              onClick={onEditClick}
              className="px-4 py-2 rounded transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
              type="button"
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
          {[
            {
              id: "firstName",
              label: "First Name",
              field: register("firstName", { required: true }),
            },
            {
              id: "lastName",
              label: "Last Name",
              field: register("lastName", { required: true }),
            },
            {
              id: "idNumber",
              label: "National ID",
              field: register("idNumber", {
                required: true,
                pattern: { value: /^\d{10}$/, message: "" },
              }),
            },
            {
              id: "emergencyPhoneNumber",
              label: "Emergency Phone Number",
              field: register("emergencyPhoneNumber"),
            },
            {
              id: "birthDate",
              label: "Birth Date",
              type: "date",
              field: register("birthDate", { required: true }),
            },
          ].map(({ id, label, field, type }) => (
            <div key={id} className={id === "birthDate" ? "col-span-1" : ""}>
              <label
                htmlFor={id}
                className="block font-semibold mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </label>
              <input
                id={id}
                type={(type as any) || "text"}
                {...field}
                className="w-full rounded px-2 py-1"
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          ))}

          <div className="col-span-2 flex space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded transition"
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
              className="px-4 py-2 rounded transition"
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

export default PersonalInformation;
