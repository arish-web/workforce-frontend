import { api } from "./api";

export const getEmployees = async (filters: {
  role?: string;
  location?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await api.get("/admin/employees", {
    params: {
      role: filters.role || undefined,
      location: filters.location || undefined,
      status: filters.status || undefined,
    },
  });

  return res.data;
};

export const createEmployee = async (data: {
  email: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  locationId?: string;
}) => {
  const res = await api.post("/admin/employees", data);
  return res.data;
};

export const updateEmployee = async (
  id: string,
  data: {
    role?: "ADMIN" | "MANAGER" | "EMPLOYEE";
    locationId?: string;
  },
) => {
  const res = await api.patch(`/admin/employees/${id}`, data);
  return res.data;
};

export const toggleEmployeeStatus = async (id: string, isActive: boolean) => {
  const res = await api.patch(`/admin/employees/${id}/status`, {
    isActive,
  });
  return res.data;
};

export const getAdminSummary = async (): Promise<{
  totalEmployees: number;
  totalManagers: number;
  totalTasks: number;
}> => {
  const res = await api.get("/admin/summary");
  return res.data;
};
