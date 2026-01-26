import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { managerService } from "../../services/manager.service";
import LogoutButton from "../../components/LogoutButton";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    managerService
      .getDashboardSummary()
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Dashboard summary error", err);
        setStats(null);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className="
          bg-green-600 text-white
          px-4 py-3 sm:px-6 sm:py-4
          flex items-center justify-between
        "
      >
        <h1 className="text-base sm:text-2xl font-bold">Manager Dashboard</h1>
        <LogoutButton />
      </header>

      {/* Content */}
      <main
        className="
          p-4 sm:p-6
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-6
        "
      >
        {/* Stats */}
        <StatCard title="Total Tasks" value={stats?.totalTasks ?? 0} />
        <StatCard title="Pending" value={stats?.pending ?? 0} />
        <StatCard title="In Progress" value={stats?.inProgress ?? 0} />
        <StatCard title="Completed" value={stats?.completed ?? 0} />
        <StatCard title="Overdue" value={stats?.overdue ?? 0} />

        {/* Actions */}
        <ActionCard
          title="Team Tasks"
          desc="View and track team tasks"
          onClick={() => navigate("/manager/tasks")}
        />
        <ActionCard
          title="Assign Task"
          desc="Create and assign new tasks"
          onClick={() => navigate("/manager/tasks/create")}
        />
        <ActionCard
          title="Reports"
          desc="View team performance reports"
          onClick={() => navigate("/manager/reports")}
        />
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
      <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{value}</h2>
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
