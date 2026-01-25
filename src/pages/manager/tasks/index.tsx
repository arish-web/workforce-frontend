import { useEffect, useState } from "react";
import { managerService } from "../../../services/manager.service";

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo?: {
    email: string;
  };
};

export default function ManagerTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await managerService.getTasks(); // 🔴 NO status here
      setAllTasks(res.data);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      setAllTasks([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!status) {
      setTasks(allTasks);
      return;
    }

    if (status === "OVERDUE") {
      const now = new Date();
      setTasks(
        allTasks.filter(
          (t) => new Date(t.dueDate) < now && t.status !== "COMPLETED",
        ),
      );
      return;
    }

    setTasks(allTasks.filter((t) => t.status === status));
  }, [status, allTasks]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Team Tasks</h1>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="OVERDUE">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {loading ? (
          <p className="p-4">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="p-4 text-gray-500">No tasks found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">
                    {task.assignedTo?.email || "Unassigned"}
                  </td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="p-3">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ================== STATUS BADGE ================== */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-sm font-medium ${
        colors[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
}
