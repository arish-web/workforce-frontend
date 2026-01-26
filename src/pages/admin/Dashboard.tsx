import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminSummary, getEmployees } from "../../services/admin.service";
import LogoutButton from "../../components/LogoutButton";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmployees: 0,
    managers: 0,
  });

  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalManagers: 0,
    totalTasks: 0,
  });

  useEffect(() => {
    getAdminSummary().then(setSummary);
  }, []);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getEmployees({
        role: "",
        location: "",
        status: "",
        page: 1,
        limit: 1000,
      });

      const data = res.data;

      setStats({
        managers: data.filter((e: any) => e.role === "MANAGER").length,
        totalEmployees: data.filter((e: any) => e.role === "EMPLOYEE").length,
      });
    } catch (err) {
      console.error("Dashboard stats failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className="
          bg-blue-600 text-white
          px-4 py-3 sm:px-6 sm:py-4
          flex items-center justify-between
        "
      >
        <h1 className="text-base sm:text-2xl font-bold">
          Admin Dashboard
        </h1>
        <LogoutButton />
      </header>

      {/* Content */}
      <main
        className="
          p-4 sm:p-6
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 sm:gap-6
        "
      >
        {/* Stats */}
        <StatCard title="Total Employees" value={stats.totalEmployees} />
        <StatCard title="Managers" value={stats.managers} />
        <StatCard title="Active Projects" value={summary.totalTasks} />

        {/* Navigation */}
        <ActionCard
          title="User Management"
          desc="Create, update and remove users"
          onClick={() => navigate("/admin/employees")}
        />
        <ActionCard
          title="Location Management"
          desc="Create and manage office locations"
          onClick={() => navigate("/admin/locations/create")}
        />
        <ActionCard
          title="Reports"
          desc="View organization-wide reports"
          onClick={() => navigate("/admin/reports")}
        />
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
      <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">
        {value}
      </h2>
    </div>
  );
}

function ActionCard({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        bg-white p-4 sm:p-6
        rounded-xl shadow
        cursor-pointer transition
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 sm:mt-2">{desc}</p>
    </div>
  );
}

