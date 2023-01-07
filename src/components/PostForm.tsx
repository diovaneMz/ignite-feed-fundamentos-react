import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { PostsTypes } from "../App";
import { SessionContext } from "../context/SessionContext";
import { Avatar } from "./Avatar";

import styles from "./PostForm.module.css";

interface PostFormProps {
  handleNewPost: (props: PostsTypes) => void;
  currentPosts: PostsTypes[];
}

export function PostForm({ handleNewPost, currentPosts }: PostFormProps) {
  const { userState } = useContext(SessionContext);
  const userData = userState.user;

  const [postText, setPostText] = useState<string>("");

  function handleCreateNewPost(event: FormEvent) {
    event.preventDefault();

    const textAreaElement = event.currentTarget.getElementsByTagName("textarea");

    const newPostText = textAreaElement
      .item(0)
      ?.value.split("\n")
      .filter((string) => string.length > 0);

    if (userData.name !== "string") {
      handleNewPost({
        id: currentPosts.length + 1,
        author: {
          name: userData.name,
          avatarUrl: userData.avatarUrl,
          role: userData.role,
        },
        content: newPostText as string[],
        publishedAt: new Date(),
      });
      setPostText('')
      return;
    }

    alert("ocorreu um erro ao enviar seu post.");
  }

  function handlePostTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target?.value)
  }

  return (
    <section className={styles.postForm}>
      <form onSubmit={handleCreateNewPost}>
        <textarea
          name="comment"
          placeholder={`No que você está pensando, ${userData.name}?`}
          value={postText}
          onChange={handlePostTextChange}
          required
        />

        <footer>
          <button type="submit">Postar</button>
        </footer>
      </form>
    </section>
  );
}
