import { useContext, useState } from "react";
import { SessionContext, SessionProps } from "./context/SessionContext";

import { LogIn } from "./components/LogIn";
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { PostForm } from "./components/PostForm";

import "./global.css";
import styles from "./App.module.css";

export interface PostsTypes {
  id: number;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  content: string[];
  publishedAt: Date;
}

function App() {
  const { setUserState, userState } = useContext(SessionContext);
  const [posts, setPosts] = useState<PostsTypes[]>([
    {
      id: 1,
      author: {
        avatarUrl: "https://github.com/diego3g.png",
        name: "Diego Fernandes",
        role: "CTO @Rocketseat",
      },
      content: [
        "Fala Galera 👋",
        "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return,",
        "jane.design/doctorcare",
      ],
      publishedAt: new Date("2022-12-22 12:00:00"),
    },
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/maykbrito.png",
        name: "Mayk Brito",
        role: "Educator @Rocketseat",
      },
      content: [
        "Fala Galera 👋",
        "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return,",
        "jane.design/doctorcare",
      ],
      publishedAt: new Date("2022-12-18 20:00:00"),
    },
  ]);

  function handleSetUserState(newUserState: SessionProps) {
    setUserState(newUserState);
  }

  function handleNewPost(newPost: PostsTypes) {
    setPosts((state) => [newPost, ...state]);
  }

  return (
    <div>
      <Header />

      {userState.isLoggedIn ? (
        <div className={styles.wrapper}>
          <Sidebar user={userState.user} />

          <main>
            <PostForm currentPosts={posts} handleNewPost={handleNewPost} />
            {posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              );
            })}
          </main>
        </div>
      ) : (
        <LogIn handleSetUserState={handleSetUserState} />
      )}
    </div>
  );
}

export default App;
