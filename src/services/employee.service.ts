// src/services/employee.service.ts
import { api } from "./api";

export const getMyTasks = async () => {
  const res = await api.get("/employee/tasks");
  return res.data;
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
) => {
  return api.patch(`/employee/tasks/${taskId}`, { status });
};
