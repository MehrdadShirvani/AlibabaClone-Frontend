import LoginModal from "@/features/authentication/modals/LoginModal";
import RegisterModal from "@/features/authentication/modals/RegisterModal";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
  ];

  const userLinks = [
    { label: "Profile", to: "/profile" },
    { label: "My Travels", to: "/my-travels" },
    { label: "Online Support", to: "/support" },
  ];

  const isActive = (path: string) =>
    location.pathname === path || (path === "/" && location.pathname === "/");

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 shadow-sm z-50"
        style={{
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left: Links */}
        <div className="flex items-center space-x-6">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="nav-link"
              style={{
                color: isActive(to) ? "var(--primary)" : "var(--text-primary)",
                backgroundColor: isActive(to)
                  ? "var(--primary-foreground)"
                  : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Auth */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <a
                href="#login"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(true);
                }}
                className="nav-link"
                style={{ color: "var(--text-primary)" }}
              >
                Login
              </a>
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  setShowRegister(true);
                }}
                className="nav-link"
                style={{ color: "var(--text-primary)" }}
              >
                Register
              </a>
            </>
          ) : (
            <>
              {userLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="nav-link"
                  style={{
                    color: isActive(to)
                      ? "var(--primary)"
                      : "var(--text-primary)",
                    backgroundColor: isActive(to)
                      ? "var(--primary-foreground)"
                      : "transparent",
                  }}
                >
                  {label}
                </Link>
              ))}
              <a
                href="#logout"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="nav-link"
                style={{ color: "var(--text-primary)" }}
              >
                Logout
              </a>
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
