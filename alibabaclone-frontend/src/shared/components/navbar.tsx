import LoginModal from "@/features/authentication/modals/LoginModal";
import RegisterModal from "@/features/authentication/modals/RegisterModal";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <nav className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
        {/* Left side: Logo and main links */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <img
            src="/images/alibaba.svg"
            alt="Alibaba Logo"
            className="h-10 w-auto"
          />

          {/* Main navigation links */}
          {["Home", "Search", "About"].map((link) => (
            <a
              key={link}
              href={`/${
                link.toLowerCase() === "home" ? "" : link.toLowerCase()
              }`}
              className="nav-link px-3 py-1 rounded-md transition-shadow duration-300 hover:text-white hover:shadow-md hover:shadow-blue-500/50"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side: User menu */}
        <div className="flex items-center space-x-6 text-sm">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="nav-link px-3 py-1 rounded-md hover:text-white hover:shadow-md hover:shadow-blue-500/50"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="nav-link px-3 py-1 rounded-md hover:text-white hover:shadow-md hover:shadow-blue-500/50"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="font-semibold nav-link">You have entered</span>
              <a
                href="/my-travels"
                className="nav-link px-3 py-1 rounded-md hover:text-white hover:shadow-md hover:shadow-blue-500/50"
              >
                My Travels
              </a>
              <a
                href="/support"
                className="nav-link px-3 py-1 rounded-md hover:text-white hover:shadow-md hover:shadow-blue-500/50"
              >
                Online Support
              </a>
              <button
                onClick={logout}
                className="nav-link px-3 py-1 rounded-md hover:text-white hover:shadow-md hover:shadow-blue-500/50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};

export default Navbar;
