import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminSettings from "./pages/admin/Settings";
import AdminReports from "./pages/admin/Reports";
import CreateLocation from "./pages/admin/locations/CreateLocation";
import EmployeeList from "./pages/admin/employees/EmployeeList";
import CreateEmployee from "./pages/admin/employees/CreateEmployee";

import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerEmployeeList from "./pages/manager/employees/ManagerEmployeeList";
import ManagerTasks from "./pages/manager/tasks";
import ManagerCreateTask from "./pages/manager/tasks/CreateTask";
import ManagerTaskDetail from "./pages/manager/tasks/TaskDetail";
import Reports from "./pages/manager/Reports"

import EmployeeDashboard from "./pages/employee/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { authService } from "./services/auth.service";

function App() {
  const loginStore = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const accessToken = useAuthStore((s) => s.accessToken);

  // 🔹 RESTORE AUTH ON APP LOAD
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
      }
    };

    if (accessToken) restoreAuth();
  }, [accessToken, loginStore, logout]);

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/locations/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />

        {/* ================= MANAGER ================= */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/employees"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerEmployeeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/tasks"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/tasks/create"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerCreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/reports"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <Reports/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/tasks/:id"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerTaskDetail />
            </ProtectedRoute>
          }
        />

        {/* ================= EMPLOYEE ================= */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

