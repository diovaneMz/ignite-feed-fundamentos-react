import { PencilLine } from "phosphor-react";
import { UserProps } from "../App";
import { Avatar } from "./Avatar";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  user: UserProps;
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src={user.bannerImageUrl} />
      <div className={styles.profile}>
        <Avatar src={user.avatarUrl} />
        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>
      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
