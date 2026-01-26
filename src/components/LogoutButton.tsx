// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/auth.store";
// import { Notify, Confirm } from "notiflix";

// export default function LogoutButton() {
//   const logout = useAuthStore((s) => s.logout);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Confirm.show(
//       "Confirm Logout",
//       "Are you sure you want to log out?",
//       "Yes",
//       "Cancel",
//       () => {
//         logout();
//         Notify.success("Logged out successfully");
//         navigate("/login");
//       },
//       () => {
//         // optional: do nothing on cancel
//       },
//     );
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium
//                  hover:bg-gray-100 transition"
//     >
//       Logout
//     </button>
//   );
// }


import { useNavigate } from "react-router-dom";
import { Notify, Confirm } from "notiflix";
import { useAuthStore } from "../store/auth.store";

type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";

const roleTheme: Record<
  Role,
  {
    titleColor: string;
    confirmColor: string;
    titleText: string;
  }
> = {
  ADMIN: {
    titleColor: "#2563eb",    // blue-600
    confirmColor: "#2563eb",
    titleText: "Admin Logout",
  },
  MANAGER: {
    titleColor: "#16a34a",    // green-600
    confirmColor: "#16a34a",
    titleText: "Manager Logout",
  },
  EMPLOYEE: {
    titleColor: "#eab308",    // yellow-500
    confirmColor: "#eab308",
    titleText: "Employee Logout",
  },
};

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const role = useAuthStore((s) => s.user?.role as Role | undefined);
  const navigate = useNavigate();

  // fallback safety
  const activeRole: Role = role ?? "MANAGER";

  const handleLogout = () => {
    Confirm.show(
      roleTheme[activeRole].titleText,
      "Are you sure you want to log out?",
      "Yes",
      "Cancel",
      () => {
        logout();
        Notify.success("Logged out successfully");
        navigate("/login");
      },
      () => {},
      {
        titleColor: roleTheme[activeRole].titleColor,
        okButtonBackground: roleTheme[activeRole].confirmColor,
      }
    );
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium
                 hover:bg-gray-100 transition"
    >
      Logout
    </button>
  );
}

