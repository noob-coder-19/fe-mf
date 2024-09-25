import { create } from "zustand";

type Store = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
};

const useStore = create<Store>()((set) => ({
  accessToken: null,
  // accessToken: "sf",
  setAccessToken: (newAccessToken) =>
    set((state) => ({ ...state, accessToken: newAccessToken })),
  userId: null,
  setUserId: (newUserId) => set((state) => ({ ...state, userId: newUserId })),
}));

export default useStore;
