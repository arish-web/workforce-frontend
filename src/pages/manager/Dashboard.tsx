import LogoutButton from "../../components/LogoutButton";

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-yellow-500 text-white p-6 text-xl font-semibold">
        Manager Dashboard
        <LogoutButton />
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="My Team Members" value="8" />
        <StatCard title="Pending Tasks" value="14" />

        <ActionCard title="Assign Tasks" desc="Distribute tasks to your team" />
        <ActionCard
          title="Team Progress"
          desc="Track performance & deadlines"
        />
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function ActionCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}
