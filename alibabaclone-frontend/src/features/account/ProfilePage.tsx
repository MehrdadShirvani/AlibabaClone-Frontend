import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import agent from "@/shared/api/agent";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { isLoggedIn, token } = useAuthStore();
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await agent.Profile.getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();
  }, [isLoggedIn]);

  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <strong>National ID:</strong> {profile.idNumber}
          </p>
          <p>
            <strong>Birth Date:</strong>{" "}
            {profile.birthDate?.toString().slice(0, 10)}
          </p>
          <p>
            <strong>Phone (Person):</strong> {profile.personPhoneNumber}
          </p>
          <p>
            <strong>Phone (Account):</strong> {profile.accountPhoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
        <div>
          <p>
            <strong>IBAN:</strong> {profile.iban}
          </p>
          <p>
            <strong>Card Number:</strong> {profile.cardNumber}
          </p>
          <p>
            <strong>Bank Account #:</strong> {profile.bankAccountNumber}
          </p>
          <p>
            <strong>Current Balance:</strong> $
            {profile.currentBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
