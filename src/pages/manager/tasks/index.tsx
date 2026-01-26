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

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await managerService.getTasks({
        page,
        limit,
        status,
      });

      setTasks(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      setTasks([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold mb-4">Team Tasks</h2>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
  border p-2 rounded
    w-full sm:w-auto
    text-xs sm:text-base
  "
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="OVERDUE">Overdue</option>
        </select>
      </div>

      {/* TABLE — MOBILE SAFE */}
      <div className="bg-white shadow rounded">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left w-2/6">Title</th>
                <th className="p-2 text-left w-1/4">Assigned To</th>
                <th className="p-2 text-left w-1/6">Priority</th>
                <th className="p-2 text-left w-1/6">Status</th>
                <th className="p-2 text-left w-1/6">Due Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Loading tasks...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="border-t">
                    <td className="p-2 truncate">{task.title}</td>
                    <td className="p-2">
                      {task.assignedTo?.email || "Unassigned"}
                    </td>
                    <td className="p-2">{task.priority}</td>
                    <td className="p-2">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
      className={`px-2 py-1 rounded text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
