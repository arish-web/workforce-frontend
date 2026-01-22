import { useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit timesheet", status: "Pending" },
    { id: 2, title: "Fix UI bug", status: "In Progress" },
  ]);

  const updateStatus = (id: number, status: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-600 text-white p-6 text-xl font-semibold flex justify-between">
        Employee Dashboard
        <button
          onClick={() => {
            sessionStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-white text-blue-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Tasks</h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Task</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-4">{task.title}</td>
                  <td className="p-4 text-center">{task.status}</td>
                  <td className="p-4 text-center">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
