import { createContext, ReactNode, useState } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export interface UserProps {
  name: string;
  role: string;
  avatarUrl: string;
  bannerImageUrl: string;
}

export interface SessionProps {
  isLoggedIn: boolean;
  user: UserProps;
}

interface SessionContextProps {
  userState: SessionProps;
  setUserState: (props: SessionProps) => void;
  lightTheme: boolean;
  setLightTheme: (props: boolean) => void;
}

export const SessionContext = createContext({} as SessionContextProps);

export function SessionProvider({ children }: SessionProviderProps) {
  const [lightTheme, setLightTheme] = useState(false);
  const [userState, setUserState] = useState<SessionProps>({
    isLoggedIn: false,
    user: {
      name: "",
      role: "",
      avatarUrl: "",
      bannerImageUrl: "",
    },
  });

  const value = {
    userState,
    setUserState,
    lightTheme,
    setLightTheme,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
