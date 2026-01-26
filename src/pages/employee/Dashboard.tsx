import { useEffect, useState } from "react";
import { getMyTasks, updateTaskStatus } from "../../services/employee.service";
import LogoutButton from "../../components/LogoutButton";

type Task = {
  id: string;
  title: string;
  status: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getMyTasks();
      setTasks(res.data ?? res);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className="
          bg-yellow-600 text-white
          px-4 py-3 sm:px-6 sm:py-4
          flex items-center justify-between
        "
      >
        <h1 className="text-base sm:text-2xl font-bold">Employee Dashboard</h1>
        <LogoutButton />
      </header>

      <main className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">My Tasks</h2>

        {/* TABLE WRAPPER — MOBILE SAFE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[500px] w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-xs sm:text-sm w-2/6">
                    Task
                  </th>
                  <th className="p-3 text-xs sm:text-sm text-center w-1/6">
                    Status
                  </th>
                  <th className="p-3 text-xs sm:text-sm text-center w-2/6">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-sm">
                      Loading tasks...
                    </td>
                  </tr>
                ) : tasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-4 text-center text-gray-500 text-sm"
                    >
                      No tasks assigned
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id} className="border-t">
                      <td className="p-3 text-xs sm:text-sm truncate">
                        {task.title}
                      </td>

                      <td className="p-3 text-xs sm:text-sm text-center whitespace-nowrap">
                        {task.status}
                      </td>

                      <td className="p-3 text-center">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateStatus(task.id, e.target.value)
                          }
                          className="
                            border rounded
                            text-xs sm:text-sm
                            px-2 py-1
                            bg-white
                          "
                        >
                          <option value="PENDING">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
