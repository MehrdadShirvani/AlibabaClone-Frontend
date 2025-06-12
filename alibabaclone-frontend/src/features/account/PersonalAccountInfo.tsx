import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import { EditEmailDto } from "@/shared/models/account/EditEmailDto";
import { EditPasswordDto } from "@/shared/models/account/EditPasswordDto";
import agent from "@/shared/api/agent";

interface Props {
  profile: ProfileDto;
  onProfileUpdated: () => void; // Callback to refresh profile
}

const PersonalAccountInfo = ({ profile, onProfileUpdated }: Props) => {
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
    await agent.Profile.editPassword(data);
    setPasswordModalOpen(false);
    resetPassword();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Personal Account Information
      </h2>

      <div className="mb-3">
        <label className="font-medium block">Phone Number:</label>
        <p>{profile.accountPhoneNumber}</p>
      </div>

      <div className="mb-3">
        <label className="font-medium block">Email:</label>
        <p>
          {profile.email ?? "No email set"}{" "}
          <button
            onClick={() => {
              reset({ newEmail: profile.email || "" });
              setEmailModalOpen(true);
            }}
            className="text-blue-600 underline ml-2"
          >
            {profile.email ? "Edit" : "Add"}
          </button>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Change Password
        </button>
      </div>

      {/* Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Update Email</h3>
            <form onSubmit={handleSubmit(onEmailSubmit)}>
              <input
                {...register("newEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter new email"
              />
              {errors.newEmail && (
                <p className="text-red-600 text-sm">
                  {errors.newEmail.message}
                </p>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
              <input
                type="password"
                {...registerPassword("oldPassword", {
                  required: "Old password is required",
                })}
                placeholder="Old Password"
                className="w-full p-2 border rounded mb-2"
              />
              {passwordErrors.oldPassword && (
                <p className="text-red-600 text-sm">
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
                className="w-full p-2 border rounded mb-2"
              />
              {passwordErrors.newPassword && (
                <p className="text-red-600 text-sm">
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
                className="w-full p-2 border rounded mb-2"
              />
              {passwordErrors.confirmNewPassword && (
                <p className="text-red-600 text-sm">
                  {passwordErrors.confirmNewPassword.message}
                </p>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
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
