import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { id: "accountInfo", label: "Account Info", path: "account-info" },
  { id: "myTravels", label: "My Travels", path: "my-travels" },
  {
    id: "listOfTravelers",
    label: "List Of Travelers",
    path: "list-of-travelers",
  },
  { id: "favorites", label: "Favorites", path: "favorites" },
  { id: "support", label: "Support", path: "support" },
  { id: "transactions", label: "Transactions", path: "transactions" },
];

const ProfilePage = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Fixed Sidebar */}
      <nav
        className="fixed top-0 left-0 w-48 h-screen shadow-md flex flex-col z-10"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div
          className="p-4 font-bold text-lg"
          style={{
            color: "var(--text-primary)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          Profile Menu
        </div>
        <ul className="flex flex-col flex-grow overflow-auto">
          {tabs.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block px-4 py-3 transition-colors ${
                    isActive ? "font-semibold" : ""
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "var(--primary)" : "transparent",
                  color: isActive
                    ? "var(--primary-foreground)"
                    : "var(--text-primary)",
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content with matching margin */}
      <main
        className="pl-1 min-h-screen"
        style={{
          padding: "1.5rem", // same as p-6
          color: "var(--text-primary)",
          backgroundColor: "var(--background)",
        }}
      >
        <div
          className="max-w-5xl w-full"
          style={{
            margin: "0 auto",
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
