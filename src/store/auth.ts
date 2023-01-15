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
        const admins = [
          "307531336388968458", // bob
          "364008742637010975", // draks
          "530357272531042304", // willz
          "429621241071140887", // zen
        ];
        if (!admins.includes(this.user.discord_id)) {
          this.logout();
          return;
        }
      } catch (err) {}
    },
    logout() {
      this.user = null;
      localStorage.removeItem("access_token");
    },
  },
});
