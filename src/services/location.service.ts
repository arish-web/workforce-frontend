// import { api } from "./api";

// export const locationService = {
//   create: async (name: string) => {
//     const res = await api.post("/admin/locations", { name });
//     return res.data;
//   },

//   list: async () => {
//     const res = await api.get("/admin/locations");
//     return res.data;
//   },
// };

// export const getLocations = async () => {
//   const res = await api.get("/locations");
//   return res.data;
// };

import { api } from "./api";

// 🔴 TEMP: hardcoded org id (OK for today)
const DEFAULT_ORG_ID = "4fe62a76-4bc0-4c6a-be4f-9e235a73dc88";

export const locationService = {
  // ✅ keeps old flow: create(name)
  create: async (name: string) => {
    const res = await api.post("/admin/locations", {
      name,
      organizationId: DEFAULT_ORG_ID,
    });
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

