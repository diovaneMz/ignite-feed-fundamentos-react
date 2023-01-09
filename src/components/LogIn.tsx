import { FormEvent, useContext } from "react";
import { SessionContext, SessionProps } from "../context/SessionContext";

import styles from "./LogIn.module.css";

interface LogInProps {
  handleSetUserState: (newUserState: SessionProps) => void;
}

export function LogIn({ handleSetUserState }: LogInProps) {
  const { lightTheme } = useContext(SessionContext);

  function handleLogFormData(event: FormEvent) {
    event.preventDefault();

    let userName = "";
    let userRole = "";
    let userAvatar = "";
    let userBannerImage = "";

    const allInputElements = Array(...event.currentTarget.getElementsByTagName("input"));
    allInputElements.forEach((element) => {
      if (element.id === "name") {
        userName = element.value;
        return;
      } else if (element.id === "role") {
        userRole = element.value;
        return;
      } else if (element.id === "avatarUrl") {
        userAvatar = element.value;
        return;
      } else if (element.id === "bannerUrl") {
        userBannerImage = element.value;
        return;
      }
    });

    if (
      userName === "" ||
      userRole === "" ||
      userAvatar === "" ||
      userBannerImage === ""
    ) {
      alert("Verifique se os campos estão corretamentos");
      return;
    }

    handleSetUserState({
      isLoggedIn: true,
      user: {
        name: userName,
        role: userRole,
        avatarUrl: userAvatar,
        bannerImageUrl: userBannerImage,
      },
    });
  }

  return (
    <>
      <section className={`${styles.logIn} ${lightTheme && styles.logInLight}`}>
        <div>
          <h2>Olá, Bem vindo!</h2>
          <p>Crie uma conta temporária para acessar o feed 🚀.</p>
        </div>
        <form onSubmit={handleLogFormData}>
          <input type="text" id="name" placeholder="Nome" />
          <input type="text" id="role" placeholder="Cargo" />
          <input
            type="text"
            id="avatarUrl"
            placeholder="Avatar: Ex.:https://avatar.com/myProfile.png"
          />

          <input
            type="text"
            id="bannerUrl"
            placeholder="Banner: Ex.:https://banners.com/myBanner.png"
          />
          <button type="submit">Acessar Feed</button>
        </form>
      </section>
    </>
  );
}
