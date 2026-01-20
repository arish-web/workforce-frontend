import { useState } from "react";
import { createEmployee } from "../../../services/adminEmployee.service";
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
  const navigate = useNavigate();
  type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";

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
    await createEmployee(form);
    navigate("/admin/employees");
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Create Employee</h2>

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Temp Password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2"
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

      <input
        placeholder="Location ID"
        className="border p-2 w-full mb-4"
        onChange={(e) => setForm({ ...form, locationId: e.target.value })}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">
        Create
      </button>
    </div>
  );
}
