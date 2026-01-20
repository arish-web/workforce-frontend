import { api } from "./api";

export const managerEmployeeService = {
  /**
   * Manager: list only employees under manager’s locations / team
   * Backend should infer managerId from JWT
   */
  listMyTeam: async () => {
    const res = await api.get("/manager/employees");
    return res.data;
  },

  /**
   * Manager: create employee (EMPLOYEE role only)
   * Manager CANNOT create ADMIN or MANAGER
   */
  createEmployee: async (data: {
    email: string;
    password: string;
    locationId: string;
  }) => {
    const res = await api.post("/manager/employees", {
      email: data.email,
      password: data.password,
      locationId: data.locationId,
    });
    return res.data;
  },

  /**
   * Manager: assign employee to a location
   * Role change NOT allowed
   */
  assignLocation: async (employeeId: string, locationId: string) => {
    const res = await api.patch(
      `/manager/employees/${employeeId}/location`,
      { locationId }
    );
    return res.data;
  },
};

  export const getMyTeam = async () => {
  const res = await api.get("/manager/employees");
  return res.data;
};


export const getManagerEmployees = async (page = 1, limit = 10) => {
  const res = await api.get("/manager/employees", {
    params: { page, limit },
  });
  return res.data;
};