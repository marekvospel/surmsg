import { writable } from "svelte/store";

let user: string | null = null;

let userFunc = () => {
  const { subscribe, set, update } = writable(user);
  return {
    subscribe,
    set: (usr: string) => {
      set((user = usr));
      localStorage.setItem("user", user);
    },
    remove: () => {
      set((user = null));
      localStorage.removeItem("user");
    },
    getFromLocal: () => {
      set((user = localStorage.getItem("user")));
    },
  };
};

export let manageUser = userFunc();

if (user === null && localStorage.getItem("user") !== null) {
  manageUser.getFromLocal();
}
