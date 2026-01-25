// // src/services/manager.service.ts
// import { api } from "./api";

// export const managerService = {
//   getDashboardSummary: () =>
//     api.get("/manager/dashboard/summary"),

//   getTasks: (status?: string) =>
//     api.get("/manager/tasks", {
//       params: status ? { status } : {},
//     }),
// };


// src/services/manager.service.ts
import { api } from "./api";

export const managerService = {
  // Dashboard stats
  getDashboardSummary: () =>
    api.get("/manager/dashboard/summary"),

  // Team tasks list (with optional status filter)
  getTasks: (status?: string) =>
    api.get("/manager/tasks", {
      params: status ? { status } : {},
    }),

  // Assign new task
  createTask: (data: {
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    priority: string;
  }) =>
    api.post("/manager/tasks", data),
};

