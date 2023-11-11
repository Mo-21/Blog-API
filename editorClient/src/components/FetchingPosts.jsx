import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function usePosts() {
  const [postURL, setPostURL] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (response.status >= 400) {
          setStatus(response.status);
          return "Not Authorized";
        }
        const actualPosts = await response.json();
        // console.log();
        const data = actualPosts.map((post) => ({
          postId: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          isDraft: post.isDraft,
        }));
        setPostURL(data);
      } catch {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return { postURL, error, loading, status };
}

function PostsProfile() {
  const { postURL, error, loading, status } = usePosts();
  const { accessToken, setAccessToken } = useAuth();

  if (error)
    return (
      <h1 style={{ color: "black", textAlign: "center" }}>
        Network error, please try again
      </h1>
    );
  if (loading)
    return <h1 style={{ color: "black", textAlign: "center" }}>LOADING...</h1>;

  const handleDelete = async (id) => {
    console.log(id);

    try {
      const response = await fetch(`api/dashboard/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 500) {
        throw new Error("Invalid Content");
      } else if (!response.ok) {
        throw new Error("Something went wrong. Please try again");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {
        <div className="posts-group">
          {postURL.map((post) => (
            <div key={post.postId} className="post">
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
              <div className="post-status">
                {post.isDraft === false ? "Live" : "Draft"}
              </div>
              <button data-key={post.postId}>
                <Link
                  to={`/dashboard/${post.postId}`}
                  style={{ textDecoration: "none" }}
                >
                  Read
                </Link>
              </button>
              <button
                onClick={() => handleDelete(post.postId)}
                data-key={post.postId}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      }
    </>
  );
}

export default PostsProfile;
