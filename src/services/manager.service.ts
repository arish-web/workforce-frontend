import { api } from "./api";

export const managerService = {
  // Dashboard stats
  getDashboardSummary: () => api.get("/manager/dashboard/summary"),
  getTasks: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get("/manager/tasks", {
      params: {
        status: params?.status,
        page: params?.page,
        limit: params?.limit,
      },
    }),

  // Assign new task
  createTask: (data: {
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    priority: string;
  }) => api.post("/manager/tasks", data),
};
