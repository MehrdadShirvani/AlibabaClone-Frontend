import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isLoggedIn, setShowLoginModal } = useAuthStore();

  if (!isLoggedIn) {
    setShowLoginModal(true);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
