import styles from "./Header.module.css";
import igniteLogo from "../assets/ignite-logo.svg";
import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { Moon, SunDim } from "phosphor-react";

export function Header() {
  const { lightTheme, setLightTheme } = useContext(SessionContext);

  function handleSetLightTheme() {
    setLightTheme(!lightTheme);
  }

  return (
    <header className={`${styles.header} ${lightTheme && styles.lightHeader}`}>
      <div>
        <img src={igniteLogo} alt="Logotipo do ignite" />
        <strong>Ignite Feed</strong>
      </div>

      <button onClick={handleSetLightTheme}>
        {lightTheme ? (
          <Moon size={24} color="var(--gray-900)" />
        ) : (
          <SunDim size={24} color="var(--white)" />
        )}
      </button>
    </header>
  );
}
