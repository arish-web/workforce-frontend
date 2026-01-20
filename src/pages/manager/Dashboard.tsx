import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-yellow-500 text-white p-6 text-xl font-semibold">
        Manager Dashboard
        <LogoutButton />
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <StatCard title="My Team Members" value="8" />
        <StatCard title="Pending Tasks" value="14" /> */}

        <ActionCard
          title="My Team Members"
          desc="View employees in your location"
          onClick={() => navigate("/manager/employees")}
        />

        <ActionCard
          title="Assign Tasks"
          desc="Distribute tasks to your team"
          onClick={() => navigate("/manager/tasks")}
        />
      </main>
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
      className={`bg-white p-6 rounded-xl shadow transition
        ${onClick ? "cursor-pointer hover:shadow-md" : ""}
      `}
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}

