import httpService from "./http.service";
import { getUserLocalIdToken } from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndPoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndPoint + getUserLocalIdToken()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndPoint + getUserLocalIdToken(),
      payload
    );
    return data;
  },
};

export default userService;
