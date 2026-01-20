import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Notify, Confirm } from "notiflix";

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    Confirm.show(
      "Confirm Logout",
      "Are you sure you want to log out?",
      "Yes",
      "Cancel",
      () => {
        logout();
        Notify.success("Logged out successfully");
        navigate("/login");
      },
      () => {
        // optional: do nothing on cancel
      },
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
