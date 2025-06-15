import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { ProfileDto } from "@/shared/models/account/ProfileDto";
import agent from "@/shared/api/agent";
import { useNavigate } from "react-router-dom";
import ProfileSummary from "./ProfileSummary";
import PersonalInformation from "./PersonalInformation";
import BankAccountDetails from "./BankAccountDetails";
import PersonalAccountInfo from "./PersonalAccountInfo";

const AccountInfo = () => {
  const { isLoggedIn } = useAuthStore();
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const navigate = useNavigate();

  const loadProfile = async () => {
    try {
      const data = await agent.Profile.getProfile();
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

  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
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

export default AccountInfo;
