import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: ("ADMIN" | "MANAGER" | "EMPLOYEE")[];
  children: React.ReactNode;
}) {
  const { user, accessToken, refreshToken } = useAuthStore();

  // ⏳ wait for token restore
  if (!accessToken && !refreshToken) {
    return null; // or loading spinner
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
