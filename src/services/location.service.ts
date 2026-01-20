import { api } from "./api";

export const locationService = {
  create: async (name: string) => {
    const res = await api.post("/admin/locations", { name });
    return res.data;
  },

  list: async () => {
    const res = await api.get("/admin/locations");
    return res.data;
  },
};

export const getLocations = async () => {
  const res = await api.get("/locations");
  return res.data;
};
