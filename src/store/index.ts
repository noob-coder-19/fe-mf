import { create } from "zustand";

type Store = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

const useStore = create<Store>()((set) => ({
  accessToken: null,
  // accessToken: "sf",
  setAccessToken: (newAccessToken) =>
    set((state) => ({ ...state, accessToken: newAccessToken })),
}));

export default useStore;
