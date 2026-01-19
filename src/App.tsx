import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManagerDashboard from "./pages/manager/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAuthStore } from "./store/auth.store";
import { authService } from "./services/auth.service";

function App() {
  const loginStore = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
  const accessToken = useAuthStore((s) => s.accessToken);

  // 🔹 RESTORE AUTH ON APP
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const data = await authService.profile();
        loginStore({
          user: {
            id: data.id,
            email: data.email,
            role: data.role,
          },
          accessToken: accessToken!,
        });
      } catch {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };

    if (accessToken) {
      restoreAuth();
    } else {
      setAuthLoading(false);
    }
  }, [accessToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
