import { Header } from "./components/Header";

import styles from "./App.module.css";

import "./global.css";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { LogIn } from "./components/LogIn";
import { useState } from "react";

interface PostsTypes {
  id: number;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  content: {
    type: "paragraph" | "link";
    content: string;
  }[];
  publishedAt: Date;
}
export interface UserProps {
  name: undefined | string;
  role: undefined | string;
  avatarUrl: undefined | string;
  bannerImageUrl: undefined | string;
}

export interface SessionProps {
  isLoggedIn: boolean;
  user: UserProps;
}

const posts: PostsTypes[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala Galera 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return,",
      },
      { type: "link", content: "jane.design/doctorcare" },
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
      { type: "paragraph", content: "Fala Galera 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return,",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-12-18 20:00:00"),
  },
];

function App() {
  const [userState, setUserState] = useState<SessionProps>({
    isLoggedIn: false,
    user: {
      name: undefined,
      role: undefined,
      avatarUrl: undefined,
      bannerImageUrl: undefined,
    },
  });

  function handleSetUserState(newUserState: SessionProps) {
    setUserState(newUserState);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        {userState.isLoggedIn ? (
          <>
            <Sidebar user={userState.user} />

            <main>
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
          </>
        ) : (
          <LogIn handleSetUserState={handleSetUserState} />
        )}
      </div>
    </div>
  );
}

export default App;
