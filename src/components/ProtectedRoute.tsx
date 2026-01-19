import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: ("ADMIN" | "MANAGER" | "EMPLOYEE")[];
  children: React.ReactNode;
}) {
  const { user, accessToken, isAuthLoading } = useAuthStore();

  // ⏳ Wait until auth restore completes
  if (isAuthLoading) {
    return null; // or a loader
  }

  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
