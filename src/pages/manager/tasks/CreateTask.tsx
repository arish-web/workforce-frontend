import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import { api } from "../../../services/api";
import { managerService } from "../../../services/manager.service";

type Employee = {
  id: string;
  email: string;
};

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/manager/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => {
        Notify.failure("Failed to load employees");
        setEmployees([]);
      });
  }, []);

  const submit = async () => {
    // 🔴 Title validation
    if (!title.trim()) {
      Notify.failure("Task title is required");
      return;
    }

    if (title.trim().length < 3) {
      Notify.failure("Task title must be at least 3 characters");
      return;
    }

    // 🔴 Employee validation
    if (!employeeId) {
      Notify.failure("Please select an employee");
      return;
    }

    // 🔴 Due date validation
    if (!dueDate) {
      Notify.failure("Due date is required");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
      Notify.failure("Due date cannot be in the past");
      return;
    }

    try {
      // Notiflix.Loading.standard("Creating task...");

      await managerService.createTask({
        title,
        description: "",
        assignedTo: employeeId,
        dueDate,
        priority: "MEDIUM",
      });

      // Notiflix.Loading.remove();
      Notify.success("Task created successfully");

      navigate("/manager/tasks");
    } catch (err) {
      // Notiflix.Loading.remove();
      Notify.failure("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Assign New Task
        </h1>

        {/* Task Title */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Task Title
          </label>
          <input
            className="input w-full p-2"
            placeholder="e.g. Build ecommerce website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Employee */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Assign To
          </label>
          <select
            className="
    input w-full
    text-xs sm:text-base
    px-2 py-1 sm:px-3 sm:py-2
  "
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.email}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Due Date
          </label>
          <input
            type="date"
            className="input w-full p-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          className="btn w-full bg-green-600 hover:bg-green-700 text-white font-medium px-2 py-2"
          onClick={submit}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
