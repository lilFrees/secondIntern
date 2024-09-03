"use client";

import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createContext, useContext, useEffect } from "react";
import { getSupabaseClient } from "../_lib/supabase/client";

interface UserState {
  user: User | null;
  setUser: (session: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-session", // name of the storage item
    },
  ),
);

interface UserContextProps {
  userState: UserState;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userState = useUserStore();
  const { setUser } = userState;

  // I need to check the user every time the app loads
  // to make sure the user is logged in
  const supabase = getSupabaseClient();
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, [setUser, supabase.auth]);

  return (
    <UserContext.Provider value={{ userState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context.userState;
};
