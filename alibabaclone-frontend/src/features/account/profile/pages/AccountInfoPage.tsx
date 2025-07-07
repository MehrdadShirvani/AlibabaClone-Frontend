import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import ProfileSummary from "../components/ProfileSummary";
import PersonalInformation from "../components/PersonalInformation";
import BankAccountDetails from "../components/BankAccountDetails";
import PersonalAccountInfo from "../components/PersonalAccountInfo";

const AccountInfoPage = () => {
  const { isLoggedIn } = useAuthStore();
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const navigate = useNavigate();

  const loadProfile = async () => {
    try {
      const data = await api.Profile.getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    loadProfile();
  }, [isLoggedIn]);

  if (!profile) {
    return (
      <p className="p-4 text-center" style={{ color: "var(--text-secondary)" }}>
        Loading profile...
      </p>
    );
  }

  return (
    <div
      className="p-6 max-w-4xl mx-auto rounded-lg shadow-sm"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Profile
      </h2>

      <ProfileSummary
        fullName={`${profile.firstName} ${profile.lastName}`}
        phoneNumber={profile.accountPhoneNumber}
        balance={profile.currentBalance}
      />

      <PersonalAccountInfo profile={profile} onProfileUpdated={loadProfile} />

      <PersonalInformation profile={profile} onProfileUpdated={loadProfile} />

      <BankAccountDetails profile={profile} onProfileUpdated={loadProfile} />
    </div>
  );
};

export default AccountInfoPage;
