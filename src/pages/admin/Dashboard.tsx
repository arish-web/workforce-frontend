import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 text-xl font-semibold flex justify-between">
        Admin Dashboard
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

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats */}
        <StatCard title="Total Employees" value="128" />
        <StatCard title="Managers" value="12" />
        <StatCard title="Active Projects" value="24" />

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

/* ================== COMPONENTS ================== */

function StatCard({ title, value }: { title: string; value: string | number }) {
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
