import { useState, useEffect } from "react";
import { createEmployee } from "../../../services/adminEmployee.service";
import { useNavigate } from "react-router-dom";
import {
  getLocations,
  locationService,
} from "../../../services/location.service";
import { Notify } from "notiflix";

export default function CreateEmployee() {
  const navigate = useNavigate();

  type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";

  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const loadLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };

    loadLocations();
  }, []);

  useEffect(() => {
    locationService.list().then(setLocations);
  }, []);

  const [form, setForm] = useState<{
    email: string;
    password: string;
    role: Role;
    locationId?: string;
  }>({
    email: "",
    password: "",
    role: "EMPLOYEE", // default
    locationId: "",
  });

  const submit = async () => {
    try {
      await createEmployee(form);

      Notify.success("User created successfully");

      navigate("/admin/employees");
    } catch (err: any) {
      Notify.failure(err?.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-1">Create User</h2>
        <p className="text-sm text-gray-500 mb-6">
          Add a new Admin, Manager, or Employee
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="user@example.com"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Temporary Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Set a temporary password"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as "ADMIN" | "MANAGER" | "EMPLOYEE",
              })
            }
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Role determines system access level
          </p>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.locationId}
            onChange={(e) => setForm({ ...form, locationId: e.target.value })}
          >
            <option value="">Unassigned</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/admin/employees")}
            className="px-4 py-2 text-sm rounded-md border text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
