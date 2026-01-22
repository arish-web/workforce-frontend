// // import { useEffect, useState } from "react";
// // import { getManagerEmployees, } from "../../../services/managerEmployee.service";

// // export default function ManagerEmployeeList() {
// //   const [employees, setEmployees] = useState<any[]>([]);
// //    const [page, setPage] = useState(1);
// //   const limit = 10;
// //   const [total, setTotal] = useState(0);

// //   console.log("employees",   employees)


// //   useEffect(() => {
// //   getManagerEmployees().then((res) => {
// //     setEmployees(res.data);   // ✅ ARRAY
// //     setTotal(res.total);     // (if you use pagination)
// //   });
// // }, []);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-xl font-bold mb-4">My Team</h2>

// //       {/* <table className="w-full bg-white rounded shadow">
// //         <thead>
// //           <tr>
// //             <th>Email</th>
// //             <th>Location</th>
// //             <th>Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {employees.map((e) => (
// //             <tr key={e.id} className="border-t">
// //               <td>{e.email}</td>
// //               <td>{e.location?.name || "-"}</td>
// //               <td>{e.isActive ? "Active" : "Inactive"}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table> */}
// //       <table className="w-full bg-white rounded-lg shadow overflow-hidden">
// //   <thead className="bg-gray-100">
// //     <tr>
// //       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
// //         Email
// //       </th>
// //       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
// //         Role
// //       </th>
// //       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
// //         Location
// //       </th>
// //       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
// //         Status
// //       </th>
// //     </tr>
// //   </thead>

// //   <tbody>
// //     {employees.length === 0 ? (
// //       <tr>
// //         <td
// //           colSpan={3}
// //           className="px-4 py-6 text-center text-gray-500"
// //         >
// //           No employees found
// //         </td>
// //       </tr>
// //     ) : (
// //       employees.map((e) => (
// //         <tr
// //           key={e.id}
// //           className="border-t hover:bg-gray-50 transition"
// //         >
// //           <td className="px-4 py-3 text-sm text-gray-800">
// //             {e.email}
// //           </td>
// //           <td className="px-4 py-3 text-sm text-gray-800">
// //             {e.role}
// //           </td>

// //           <td className="px-4 py-3 text-sm text-gray-700">
// //             {e.location?.name || "Unassigned"}
// //           </td>

// //           <td className="px-4 py-3">
// //             <span
// //               className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
// //                 ${
// //                   e.isActive
// //                     ? "bg-green-100 text-green-700"
// //                     : "bg-red-100 text-red-700"
// //                 }
// //               `}
// //             >
// //               {e.isActive ? "Active" : "Inactive"}
// //             </span>
// //           </td>
// //         </tr>
// //       ))
// //     )}
// //   </tbody>
// // </table>

// //           <div className="flex justify-between items-center mt-4">
// //         <span className="text-sm text-gray-500">
// //           Page {page} of {Math.ceil(total / limit)}
// //         </span>

// //         <div className="flex gap-2">
// //           <button
// //             disabled={page === 1}
// //             onClick={() => setPage(page - 1)}
// //             className="px-3 py-1 border rounded disabled:opacity-50"
// //           >
// //             Previous
// //           </button>

// //           <button
// //             disabled={page * limit >= total}
// //             onClick={() => setPage(page + 1)}
// //             className="px-3 py-1 border rounded disabled:opacity-50"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { api } from "../../../services/api";
// import { managerService } from "../../../services/manager.service";


// type Employee = {
//   id: string;
//   name: string;
//   status: "ACTIVE" | "INACTIVE";
//   taskCount: number;
// };

// export default function ManagerEmployeeList() {
//   const [employees, setEmployees] = useState<Employee[]>([]);

//   useEffect(() => {
//   managerService.getEmployees().then(setEmployees);
// }, []);

//   useEffect(() => {
//     api.get("/manager/employees").then(res => {
//       setEmployees(res.data);
//     });
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold mb-4">My Team</h1>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Name</th>
//             <th>Status</th>
//             <th>Tasks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(emp => (
//             <tr key={emp.id} className="border-t">
//               <td className="p-2">{emp.name}</td>
//               <td>{emp.status}</td>
//               <td>{emp.taskCount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getManagerEmployees } from "../../../services/managerEmployee.service";

export default function ManagerEmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManagerEmployees()
      .then(setEmployees)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading employees...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-semibold mb-4">My Team</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="p-4">{emp.email}</td>
                <td className="p-4 text-center">{emp.role}</td>
                <td className="p-4 text-center">
                  {emp.location?.name || "Unassigned"}
                </td>
                <td className="p-4 text-center">
                  <StatusBadge active={emp.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
