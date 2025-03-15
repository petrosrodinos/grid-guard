import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore {
    isLoggedIn: boolean;
    user: any;
}

const initialValues: UserStore = {
    isLoggedIn: false,
    user: null
};

const STORE_KEY = "auth";

export const useAuthStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                login: (user: any) => set((state) => ({ ...state, ...user })),
                logout: () => set(initialValues),
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getAuthStoreState = () => useAuthStore.getState();