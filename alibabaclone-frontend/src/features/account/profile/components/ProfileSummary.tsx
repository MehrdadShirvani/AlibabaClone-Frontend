// components/profile/ProfileSummary.tsx
import React from "react";

interface ProfileSummaryProps {
  fullName: string;
  phoneNumber: string;
  balance: number;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  fullName,
  phoneNumber,
  balance,
}) => {
  return (
    <div
      className="flex justify-between  items-center p-6 rounded-xl shadow-md mb-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Left: Profile Image */}
      <div className="flex items-center">
        <img
          src="/images/profile.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mr-6"
          style={{ border: "2px solid var(--border)" }}
        />
        <div>
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {fullName}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {phoneNumber}
          </p>
        </div>
      </div>

      {/* Right: Balance */}
      <div className="text-right">
        <p
          className="text-lg font-semibold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          Current Balance
        </p>
        <p
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--accent)" }}
        >
          ${balance.toLocaleString()}
        </p>
        <button
          className="px-4 py-2 rounded-md transition"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          Increase Balance
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
