// import { useEffect, useState } from "react";
// import { managerService } from "../../../services/manager.service";

// type Task = {
//   id: string;
//   title: string;
//   status: string;
//   priority: string;
//   dueDate: string;
//   assignedTo?: {
//     email: string;
//   };
// };

// export default function ManagerTasks() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [allTasks, setAllTasks] = useState<Task[]>([]);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await managerService.getTasks(); // 🔴 NO status here
//       setAllTasks(res.data);
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Failed to fetch tasks", err);
//       setAllTasks([]);
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     if (!status) {
//       setTasks(allTasks);
//       return;
//     }

//     if (status === "OVERDUE") {
//       const now = new Date();
//       setTasks(
//         allTasks.filter(
//           (t) => new Date(t.dueDate) < now && t.status !== "COMPLETED",
//         ),
//       );
//       return;
//     }

//     setTasks(allTasks.filter((t) => t.status === status));
//   }, [status, allTasks]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-4">Team Tasks</h1>

//       {/* Filter */}
//       <div className="mb-4">
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="IN_PROGRESS">In Progress</option>
//           <option value="COMPLETED">Completed</option>
//           <option value="OVERDUE">Overdue</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded shadow overflow-x-auto">
//         {loading ? (
//           <p className="p-4">Loading tasks...</p>
//         ) : tasks.length === 0 ? (
//           <p className="p-4 text-gray-500">No tasks found</p>
//         ) : (
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Assigned To</th>
//                 <th className="p-3 text-left">Priority</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Due Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task.id} className="border-t">
//                   <td className="p-3">{task.title}</td>
//                   <td className="p-3">
//                     {task.assignedTo?.email || "Unassigned"}
//                   </td>
//                   <td className="p-3">{task.priority}</td>
//                   <td className="p-3">
//                     <StatusBadge status={task.status} />
//                   </td>
//                   <td className="p-3">
//                     {new Date(task.dueDate).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================== STATUS BADGE ================== */

// function StatusBadge({ status }: { status: string }) {
//   const colors: Record<string, string> = {
//     PENDING: "bg-yellow-100 text-yellow-700",
//     IN_PROGRESS: "bg-blue-100 text-blue-700",
//     COMPLETED: "bg-green-100 text-green-700",
//     OVERDUE: "bg-red-100 text-red-700",
//   };

//   return (
//     <span
//       className={`px-2 py-1 rounded text-sm font-medium ${
//         colors[status] || "bg-gray-100"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }


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

  // 🔹 pagination (added)
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

  // reload on page / filter change
  useEffect(() => {
    fetchTasks();
  }, [page, status]);

  // reset page on filter change (same behavior as admin)
  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Team Tasks</h2>

      {/* Filter (unchanged style, admin-like placement) */}
      <div className="flex gap-4 mb-4">
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

      {/* Table (ADMIN EMPLOYEE UI CLONE) */}
      <table className="w-full bg-white shadow rounded table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left w-2/6">Title</th>
            <th className="p-2 text-left w-1/6">Assigned To</th>
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
                <td className="p-2">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination (COPIED from Admin EmployeeList) */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Page {page} of {Math.ceil(total / limit) || 1}
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

/* ================== STATUS BADGE (UNCHANGED) ================== */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

