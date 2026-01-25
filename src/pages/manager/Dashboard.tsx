import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { managerService } from "../../services/manager.service";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
  managerService
    .getDashboardSummary()
    .then((res) => {
      console.log("DASHBOARD SUMMARY:", res.data);
      setStats(res.data);
    })
    .catch((err) => {
      console.error("Dashboard summary error", err);
      setStats(null);
    });
}, []);


  // if (loading) {
  //   return <p className="p-6">Loading dashboard...</p>;
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-6 text-xl font-semibold flex justify-between">
        Manager Dashboard
        <button
          onClick={() => {
            sessionStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-white text-blue-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={stats?.totalTasks ?? 0} />
        <StatCard title="Pending" value={stats?.pending ?? 0} />
        <StatCard title="In Progress" value={stats?.inProgress ?? 0} />
        <StatCard title="Completed" value={stats?.completed ?? 0} />
        <StatCard title="Overdue" value={stats?.overdue ?? 0} />

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
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
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
      className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}


