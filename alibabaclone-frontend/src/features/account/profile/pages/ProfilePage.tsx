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
      {/* Sidebar */}
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
                onMouseEnter={(e) => {
                  if (!e.currentTarget.style.backgroundColor) {
                    e.currentTarget.style.backgroundColor =
                      "var(--accent-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    e.currentTarget.style.backgroundColor ===
                    "var(--accent-hover)"
                  ) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main
        className="ml-48 p-6 overflow-auto"
        style={{
          color: "var(--text-primary)",
          minWidth: "600px",
          height: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePage;
