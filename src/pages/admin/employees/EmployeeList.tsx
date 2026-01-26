
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployees,
  toggleEmployeeStatus,
  updateEmployee,
} from "../../../services/admin.service";
import { locationService } from "../../../services/location.service";

export default function EmployeeList() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [employees, setEmployees] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    role: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    locationService.list().then(setLocations);
  }, []);

  useEffect(() => {
    load();
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getEmployees({
        ...filters,
        page,
        limit,
      });

      setEmployees(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error("Failed to fetch employees", err);
      setEmployees([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        Employee Management
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        {/* Role */}
        <select
          className="border p-2 rounded"
          value={filters.role}
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value })
          }
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="EMPLOYEE">Employee</option>
        </select>

        {/* Status */}
        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Create Button */}
        <button
          onClick={() => navigate("/admin/employees/create")}
          className="sm:ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create User
        </button>
      </div>

      {/* Table (scrollable on mobile) */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full bg-white shadow rounded table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left w-2/6">Email</th>
              <th className="p-2 text-left w-1/6">Role</th>
              <th className="p-2 text-left w-1/6">Location</th>
              <th className="p-2 text-left w-1/6">Status</th>
              <th className="p-2 text-center w-1/6">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading employees...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2 truncate">{e.email}</td>

                  <td className="p-2">{e.role}</td>

                  <td className="p-2">
                    <select
                      className="border p-1 rounded w-full"
                      value={e.locationId || ""}
                      onChange={async (ev) => {
                        await updateEmployee(e.id, {
                          locationId: ev.target.value,
                        });
                        load();
                      }}
                    >
                      <option value="">Unassigned</option>
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        e.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {e.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="text-center">
                    <button
                      onClick={async () => {
                        await toggleEmployeeStatus(
                          e.id,
                          !e.isActive
                        );
                        load();
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        e.isActive
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                      aria-label="Toggle employee status"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          e.isActive
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center mt-4">
        <span className="text-sm text-gray-500">
          Page {page} of {Math.ceil(total / limit) || 1}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div> */}
      {/* Pagination — DESKTOP ONLY */}
<div className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center mt-4">
  <span className="text-sm text-gray-500">
    Page {page} of {Math.ceil(total / limit) || 1}
  </span>

  <div className="flex gap-2">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Previous
    </button>

    <button
      disabled={page * limit >= total}
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>

    </div>
  );
}

