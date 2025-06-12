import React, { useState } from "react";
import AccountInfo from "./AccountInfo"; // your combined component with 4 parts
import Support from "./Support";
import Transactions from "./Transactions";
import MyTravels from "./MyTravels";
import ListOfTravelers from "./ListOfTravelers";
import Favorites from "./Favorites";

const tabs = [
  { id: "accountInfo", label: "Account Info" },
  { id: "myTravels", label: "My Travels" },
  { id: "listOfTravelers", label: "List Of Travelers" },
  { id: "favorites", label: "Favorites" },
  { id: "support", label: "Support" },
  { id: "transactions", label: "Transactions" },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("accountInfo");

  const renderContent = () => {
    switch (activeTab) {
      case "accountInfo":
        return <AccountInfo />;
      case "myTravels":
        return <MyTravels />;
      case "listOfTravelers":
        return <ListOfTravelers />;
      case "favorites":
        return <Favorites />;
      case "support":
        return <Support />;
      case "transactions":
        return <Transactions />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        className="sticky top-0 h-screen w-48 bg-white shadow-md flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        <div className="p-4 font-bold text-lg border-b">Profile Menu</div>
        <ul className="flex flex-col flex-grow">
          {tabs.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => setActiveTab(id)}
                className={`w-full text-left px-4 py-3 hover:bg-blue-100 transition-colors ${
                  activeTab === id
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-700"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content area */}
      <main className="flex-grow p-6">{renderContent()}</main>
    </div>
  );
};

export default ProfilePage;
