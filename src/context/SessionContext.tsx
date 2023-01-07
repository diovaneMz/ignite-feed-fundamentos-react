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
}

export const SessionContext = createContext({} as SessionContextProps);

export function SessionProvider({ children }: SessionProviderProps) {
  const [userState, setUserState] = useState<SessionProps>({
    isLoggedIn: true,
    user: {
      name: 'Diovane',
      role: 'Developer',
      avatarUrl: 'https://github.com/diovaneMz.png',
      bannerImageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.k7zW8jygYG0rY6I0sQdXewHaE4%26pid%3DApi&f=1&ipt=d678116574ded52d69e1ef095ce79c58737e6851ef85e194af8bee92315bdcda&ipo=images',
    },
  });

  const value = {
    userState,
    setUserState,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
