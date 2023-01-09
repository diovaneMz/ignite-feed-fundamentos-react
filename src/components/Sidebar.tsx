import { PencilLine } from "phosphor-react";
import { useContext } from "react";
import { SessionContext, SessionProps, UserProps } from "../context/SessionContext";
import { Avatar } from "./Avatar";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  user: UserProps;
}

export function Sidebar({ user }: SidebarProps) {
  const { lightTheme } = useContext(SessionContext)
  
  return (
    <aside className={`${styles.sidebar} ${lightTheme && styles.sidebarLight}`}>
      <img className={styles.cover} src={user.bannerImageUrl} />
      <div className={styles.profile}>
        <Avatar src={user.avatarUrl} />
        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>
      <footer>
        <button disabled type="button">
          <PencilLine size={20} />
          Editar seu perfil
        </button>
      </footer>
    </aside>
  );
}
