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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <form className="comment-form" action="" method="post">
        <div className="mb-3">
          <label className="username form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            name="username"
            placeholder="It could be anything..."
            onChange={handleUsernameChange}
            value={username}
            required
          />
        </div>
        <div className="mb-3">
          <label className="comment form-label" htmlFor="comment">
            Comment
          </label>

          <textarea
            onChange={handleContentChange}
            type="text"
            id="comment"
            className="form-control"
            name="comment"
            value={comment}
            required
          />
          <button
            className="btn"
            onClick={handleCommentSubmission}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comment;
