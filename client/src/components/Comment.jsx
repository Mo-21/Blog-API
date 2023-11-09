import { useState } from "react";
import { useParams } from "react-router-dom";

function Comment() {
  const [comment, setComment] = useState();
  const [username, setUsername] = useState();
  const params = useParams();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleContentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmission = async (e) => {
    e.preventDefault();
    setComment("");
    setUsername("");
    console.log(comment, username);

    try {
      const response = await fetch(`/api/posts/${params.postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, content: comment }),
      });
      if (!response.ok) {
        throw new Error("Couldn't handle it");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action="" method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="It could be anything..."
          onChange={handleUsernameChange}
          value={username}
          required
        />

        <label htmlFor="comment">Comment</label>
        <input
          onChange={handleContentChange}
          type="text"
          id="comment"
          name="comment"
          value={comment}
          required
        />
        <button onClick={handleCommentSubmission} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Comment;
