import { http } from "./config";

const authService = {
  signUp: (data) => {
    return http.post("/auth/signup", data);
  },
  signIn: (data) => {
    return http.post("/auth/signin", data);
  },
};

export { authService };
