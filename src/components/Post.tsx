import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, FormEvent, InvalidEvent, useContext, useState } from "react";
import { SessionContext } from "../context/SessionContext";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: string[];
}

interface CommentTypes {
  owner: string;
  content: string;
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
  const { userState, lightTheme } = useContext(SessionContext);
  const userData = userState.user;

  const [comments, setComments] = useState<CommentTypes[]>([] as CommentTypes[]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    console.log(comments);

    setComments([
      {
        owner: userData.name,
        content: newCommentText,
        publishedAt: new Date(),
      },
      ...comments,
    ]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentIsInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse é um campo obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment.content !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={`${styles.post} ${lightTheme && styles.postLight}`}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          há {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          return <p key={line + line.length + content}>{line}</p>;
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu comentário</strong>

        <textarea
          onChange={handleNewCommentChange}
          value={newCommentText}
          name="comment"
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentIsInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Comentar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.content}
              content={comment.content}
              onDeleteComment={deleteComment}
              publishedAt={comment.publishedAt}
            />
          );
        })}
      </div>
    </article>
  );
}
