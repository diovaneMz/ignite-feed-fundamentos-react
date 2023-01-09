import { useContext, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar } from "./Avatar";

import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
  publishedAt: Date;
}

export function Comment({ content, onDeleteComment, publishedAt }: CommentProps) {
  const { userState, lightTheme } = useContext(SessionContext);

  const [likeCount, setLikeCount] = useState(0);

  const ownerName = userState.user.name;
  const ownerAvatar = userState.user.avatarUrl;

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((prevState) => {
      return prevState + 1;
    });
  }

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const commentDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
  });

  return (
    <div className={`${styles.comment} ${lightTheme && styles.commentLight}`}>
      <Avatar hasBorder={false} src={ownerAvatar} alt={`avatar de ${ownerName}`} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{ownerName}</strong>
              <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
                há {commentDateRelativeToNow}
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
