import styles from "LogIn.module.css";
import { FormEvent } from "react";
import { SessionProps } from "../App";

interface LogInProps {
  handleSetUserState: (newUserState: SessionProps) => void;
}

export function LogIn({ handleSetUserState }: LogInProps) {
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
      alert('Verifique se os campos estão corretamentos')
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
    <form onSubmit={handleLogFormData}>
      <label htmlFor="name">Nome:</label>
      <input type="text" id="name" placeholder="Daniel Moura" />
      <label htmlFor="role">Cargo:</label>
      <input type="text" id="role" placeholder="Desenvolvedor de software" />
      <label htmlFor="avatarURL">Avatar:</label>
      <input type="text" id="avatarUrl" placeholder="https://avatar.com/myProfile.png" />
      <label htmlFor="bannerUrl">Banner do perfil:</label>
      <input type="text" id="bannerUrl" placeholder="https://banners.com/myBanner.png" />

      <button type="submit">Acessar Feed</button>
    </form>
  );
}
