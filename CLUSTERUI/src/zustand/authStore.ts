import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
    authStatus: boolean
}

type Actions = {
    setAuthStatus: (x: boolean) => void
}




export const useAuthStore = create<State & Actions>()(
    persist(
        (set) => ({
            authStatus: false,
            setAuthStatus: (x: boolean) => set(() => ({authStatus: x}))
        }),
        {
            name: "auth-status-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)
