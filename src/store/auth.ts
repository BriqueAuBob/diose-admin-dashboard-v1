import axios from "../composables/axios";
import { defineStore } from "pinia";
import { routerKey, useRouter } from "vue-router";

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
        const { data } = await axios.get("/auth/user");
        this.user = data.user;
        const admins = [
          "307531336388968458",
          "364008742637010975",
          "365124713623846913",
          "530357272531042304",
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
