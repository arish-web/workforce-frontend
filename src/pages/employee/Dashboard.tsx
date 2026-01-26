// import { useState } from "react";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Submit timesheet", status: "Pending" },
//     { id: 2, title: "Fix UI bug", status: "In Progress" },
//   ]);

//   const updateStatus = (id: number, status: string) => {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, status } : t))
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-yellow-600 text-white p-6 text-xl font-semibold flex justify-between">
//         Employee Dashboard
//         <button
//           onClick={() => {
//             sessionStorage.clear();
//             window.location.href = "/login";
//           }}
//           className="bg-white text-blue-600 px-4 py-1 rounded"
//         >
//           Logout
//         </button>
//       </header>

//       {/* Content */}
//       <main className="p-6">
//         <h2 className="text-xl font-semibold mb-4">My Tasks</h2>

//         <div className="bg-white rounded-xl shadow overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left p-4">Task</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task.id} className="border-t">
//                   <td className="p-4">{task.title}</td>
//                   <td className="p-4 text-center">{task.status}</td>
//                   <td className="p-4 text-center">
//                     <select
//                       value={task.status}
//                       onChange={(e) =>
//                         updateStatus(task.id, e.target.value)
//                       }
//                       className="border rounded px-2 py-1"
//                     >
//                       <option>Pending</option>
//                       <option>In Progress</option>
//                       <option>Completed</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getMyTasks,
  updateTaskStatus,
} from "../../services/employee.service";

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
      setTasks(res.data ?? res); // depending on your API shape
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
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status } : t
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
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
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center">
                    Loading tasks...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No tasks assigned
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
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
      </main>
    </div>
  );
}

