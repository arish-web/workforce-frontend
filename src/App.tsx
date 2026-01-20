// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";

// import Login from "./pages/Login";
// import AdminDashboard from "./pages/admin/Dashboard";
// import ManagerDashboard from "./pages/manager/Dashboard";
// import EmployeeDashboard from "./pages/employee/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import EmployeeList from "../src/pages/admin/employees/EmployeeList";
// import CreateEmployee from "../src/pages/admin/employees/CreateEmployee";

// import { useAuthStore } from "./store/auth.store";
// import { authService } from "./services/auth.service";
// import Signup from "./pages/Signup";

// function App() {
//   const loginStore = useAuthStore((s) => s.login);
//   const logout = useAuthStore((s) => s.logout);
//   const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
//   const accessToken = useAuthStore((s) => s.accessToken);

//   // 🔹 RESTORE AUTH ON APP
//   useEffect(() => {
//     const restoreAuth = async () => {
//       try {
//         const data = await authService.profile();
//         loginStore({
//           user: {
//             id: data.id,
//             email: data.email,
//             role: data.role,
//           },
//           accessToken: accessToken!,
//         });
//       } catch {
//         logout();
//       } finally {
//         setAuthLoading(false);
//       }
//     };

//     if (accessToken) {
//       restoreAuth();
//     } else {
//       setAuthLoading(false);
//     }
//   }, [accessToken]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/" element={<Login />} />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/manager"
//           element={
//             <ProtectedRoute allowedRoles={["MANAGER"]}>
//               <ManagerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/employee"
//           element={
//             <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
//               <EmployeeDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/admin/employees" element={<EmployeeList />} />
//         <Route path="/admin/employees/create" element={<CreateEmployee />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard from "./pages/admin/Dashboard";
import ManagerDashboard from "./pages/manager/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";

import EmployeeList from "./pages/admin/employees/EmployeeList";
import CreateEmployee from "./pages/admin/employees/CreateEmployee";

import ManagerEmployeeList from "./pages/manager/employees/ManagerEmployeeList";
import ManagerCreateEmployee from "./pages/manager/employees/CreateEmployee";

import ProtectedRoute from "./components/ProtectedRoute";

import { useAuthStore } from "./store/auth.store";
import { authService } from "./services/auth.service";
import AdminSettings from "./pages/admin/Settings";
import AdminReports from "./pages/admin/Reports";
import CreateLocation from "./pages/admin/locations/CreateLocation";

function App() {
  const loginStore = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
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
        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
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

        <Route
          path="/admin/locations/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateLocation />
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

        {/* MANAGER */}
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
          path="/manager/employees/create"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerCreateEmployee />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE */}
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
