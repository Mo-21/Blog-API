import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        const data = actualPosts.map((post) => ({
          postId: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
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

  if (error)
    return (
      <h1 style={{ color: "black", textAlign: "center" }}>
        Network error, please try again
      </h1>
    );
  if (loading)
    return <h1 style={{ color: "black", textAlign: "center" }}>LOADING...</h1>;

  return (
    <>
      {
        <div className="posts-group">
          {postURL.map((post) => (
            <div key={post.postId} className="post">
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
              <div className="post-author">{post.author.username}</div>
              <button data-key={post.postId}>
                <Link to={`/${post.postId}`} style={{ textDecoration: "none" }}>
                  Read
                </Link>
              </button>
            </div>
          ))}
        </div>
      }
    </>
  );
}

export default PostsProfile;