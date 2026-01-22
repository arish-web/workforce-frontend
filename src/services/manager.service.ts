import { api } from "./api";

export const getManagerTasks = async () => {
  const res = await api.get("/manager/tasks");
  return res.data;
};

// export const managerService = async (payload: {
//   title: string;
//   deadline: string;
//   employeeName?: string;
// }) => {
//   const res = await api.post("/manager/tasks", payload);
//   return res.data;
// };
export const managerService = {
  createTask: async (payload: {
    title: string;
    deadline: string;
    employeeId?: string;
    employeeName?: string;
  }) => {
    const res = await api.post("/manager/tasks/create", payload);
    return res.data;
  },

  getTasks: async () => {
    const res = await api.get("/manager/tasks");
    return res.data;
  },
};