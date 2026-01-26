import { useEffect, useState } from "react";
import { getManagerEmployees } from "../../../services/managerEmployee.service";

export default function ManagerEmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManagerEmployees()
      .then(setEmployees)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading employees...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-semibold mb-4">My Team</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="p-4">{emp.email}</td>
                <td className="p-4 text-center">{emp.role}</td>
                <td className="p-4 text-center">
                  {emp.location?.name || "Unassigned"}
                </td>
                <td className="p-4 text-center">
                  <StatusBadge active={emp.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
