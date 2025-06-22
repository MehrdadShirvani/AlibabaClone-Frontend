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
    <div className="flex justify-between items-center bg-white shadow-md p-6 rounded-xl mb-6">
      {/* Left: Profile Image */}
      <div className="flex items-center">
        <img
          src="/images/sample-avatar.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mr-6"
        />
        <div>
          <h2 className="text-xl font-bold">{fullName}</h2>
          <p className="text-gray-600">{phoneNumber}</p>
        </div>
      </div>

      {/* Right: Balance */}
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-700">Current Balance</p>
        <p className="text-2xl font-bold text-green-600 mb-2">
          {balance.toLocaleString()} تومان
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Increase Balance
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
