import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import { EditEmailDto } from "@/shared/models/account/EditEmailDto";
import { EditPasswordDto } from "@/shared/models/account/EditPasswordDto";
import agent from "@/shared/api/agent";

interface Props {
  profile: ProfileDto;
  onProfileUpdated: () => void;
}

const PersonalAccountInfo: React.FC<Props> = ({
  profile,
  onProfileUpdated,
}) => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditEmailDto>();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<EditPasswordDto>();

  const onEmailSubmit = async (data: EditEmailDto) => {
    await agent.Profile.editEmail(data);
    setEmailModalOpen(false);
    onProfileUpdated();
  };

  const onPasswordSubmit = async (data: EditPasswordDto) => {
    agent.Profile.editPassword(data)
      .then(() => {
        setPasswordModalOpen(false);
        resetPassword();
      })
      .catch(() => {
        alert("You entered the wrong password");
      });
  };

  return (
    <div
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
        Personal Account Information
      </h2>

      <div className="mb-3">
        <label
          className="font-medium block mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Phone Number:
        </label>
        <p style={{ color: "var(--text-primary)" }}>
          {profile.accountPhoneNumber}
        </p>
      </div>

      <div className="mb-3">
        <label
          className="font-medium block mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Email:
        </label>
        <p style={{ color: "var(--text-primary)" }}>
          {profile.email ?? "No email set"}{" "}
          <button
            onClick={() => {
              reset({ newEmail: profile.email || "" });
              setEmailModalOpen(true);
            }}
            className="underline transition"
            style={{ color: "var(--primary)" }}
          >
            {profile.email ? "Edit" : "Add"}
          </button>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="px-4 py-2 rounded transition"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          Change Password
        </button>
      </div>

      {/* Email Modal */}
      {emailModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="p-6 rounded-md shadow-lg w-full max-w-md"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Update Email
            </h3>
            <form onSubmit={handleSubmit(onEmailSubmit)}>
              <input
                {...register("newEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-2 rounded mb-2"
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Enter new email"
              />
              {errors.newEmail && (
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--destructive)" }}
                >
                  {errors.newEmail.message}
                </p>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 rounded transition"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded transition"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {passwordModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="p-6 rounded-md shadow-lg w-full max-w-md"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Change Password
            </h3>
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
              <input
                type="password"
                {...registerPassword("oldPassword", {
                  required: "Old password is required",
                })}
                placeholder="Old Password"
                className="w-full p-2 rounded mb-2"
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {passwordErrors.oldPassword && (
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--destructive)" }}
                >
                  {passwordErrors.oldPassword.message}
                </p>
              )}

              <input
                type="password"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="New Password"
                className="w-full p-2 rounded mb-2"
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {passwordErrors.newPassword && (
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--destructive)" }}
                >
                  {passwordErrors.newPassword.message}
                </p>
              )}

              <input
                type="password"
                {...registerPassword("confirmNewPassword", {
                  validate: (value, formValues) =>
                    value === formValues.newPassword ||
                    "Passwords do not match",
                })}
                placeholder="Confirm New Password"
                className="w-full p-2 rounded mb-2"
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {passwordErrors.confirmNewPassword && (
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--destructive)" }}
                >
                  {passwordErrors.confirmNewPassword.message}
                </p>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2 rounded transition"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded transition"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalAccountInfo;
