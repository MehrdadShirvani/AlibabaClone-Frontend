import { NavLink, Outlet, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        className="sticky top-0 h-screen w-48 bg-white shadow-md flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        <div className="p-4 font-bold text-lg border-b">Profile Menu</div>
        <ul className="flex flex-col flex-grow">
          {tabs.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `w-full block text-left px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePage;
