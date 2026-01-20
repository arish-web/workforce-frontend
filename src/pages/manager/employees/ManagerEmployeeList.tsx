import { useEffect, useState } from "react";
import { getManagerEmployees, } from "../../../services/managerEmployee.service";

export default function ManagerEmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
   const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  console.log("employees",   employees)


  useEffect(() => {
  getManagerEmployees().then((res) => {
    setEmployees(res.data);   // ✅ ARRAY
    setTotal(res.total);     // (if you use pagination)
  });
}, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Team</h2>

      {/* <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th>Email</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-t">
              <td>{e.email}</td>
              <td>{e.location?.name || "-"}</td>
              <td>{e.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
        Email
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
        Role
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
        Location
      </th>
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
        Status
      </th>
    </tr>
  </thead>

  <tbody>
    {employees.length === 0 ? (
      <tr>
        <td
          colSpan={3}
          className="px-4 py-6 text-center text-gray-500"
        >
          No employees found
        </td>
      </tr>
    ) : (
      employees.map((e) => (
        <tr
          key={e.id}
          className="border-t hover:bg-gray-50 transition"
        >
          <td className="px-4 py-3 text-sm text-gray-800">
            {e.email}
          </td>
          <td className="px-4 py-3 text-sm text-gray-800">
            {e.role}
          </td>

          <td className="px-4 py-3 text-sm text-gray-700">
            {e.location?.name || "Unassigned"}
          </td>

          <td className="px-4 py-3">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                ${
                  e.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {e.isActive ? "Active" : "Inactive"}
            </span>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

          <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Page {page} of {Math.ceil(total / limit)}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
