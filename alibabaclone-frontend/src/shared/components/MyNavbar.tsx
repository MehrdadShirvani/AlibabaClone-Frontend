import LoginModal from "@/features/account/authentication/components/LoginModal";
import RegisterModal from "@/features/account/authentication/components/RegisterModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "../layout/ThemeSwitcher";

const MyNavbar = () => {
  const { isLoggedIn, logout, showLoginModal, setShowLoginModal } =
    useAuthStore();
  const [showRegister, setShowRegister] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
  ];

  const userLinks = [
    { label: "Profile", to: "/profile/account-info" },
    { label: "My Travels", to: "/profile/my-travels" },
    { label: "Online Support", to: "/profile/support" },
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
                  setShowLoginModal(true);
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
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </nav>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};

export default MyNavbar;
