import { ImgHTMLAttributes, useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  const { lightTheme } = useContext(SessionContext);

  return (
    <img
      className={
        hasBorder
          ? `${styles.avatarWithBorder} ${lightTheme && styles.avatarLight}`
          : styles.avatar
      }
      {...props}
    />
  );
}
