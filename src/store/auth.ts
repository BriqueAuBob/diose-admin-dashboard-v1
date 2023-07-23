import axios from "../composables/axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn() {
      return !!this.user;
    },
  },
  actions: {
    async login(user) {
      try {
        if (!user) {
          const { data } = await axios.get("/auth/user");
          this.user = data.user;
        } else {
          this.user = user;
        }
        if (!this.user.permissions.includes("view_dashboard")) {
          this.logout();
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("access_token");
    },
  },
});
