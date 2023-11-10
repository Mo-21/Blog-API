import { Navbar } from "./App";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comment from "./Comment";

export function usePosts() {
  const [postURL, setPostURL] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const link = `/api/posts/${param.postId}`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(link);
        if (response.status >= 400) console.log(response);
        const actualPosts = await response.json();
        setPostURL(actualPosts);
        console.log(actualPosts);
      } catch {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return { postURL, error, loading };
}

function Post() {
  const { postURL, error, loading } = usePosts();

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
      <Navbar />
      <div className="one-post-container">
        <div key={postURL.postId} className="one-post">
          <div className="one-post-title">{postURL.title}</div>
          <div className="one-post-creationTime">
            Created at: {postURL.createdAt}
          </div>
          <div className="one-post-content">{postURL.content}</div>
          <div className="one-post-author">{postURL.author.username}</div>
        </div>
      </div>
      <hr />
      <div className="comments-group mt-4">
        <h2>Comments</h2>
        {postURL.comments ? (
          postURL.comments.map((post, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{post.username}</h5>
                <p className="card-text">{post.content}</p>
                <div className="card-date">{post.creationDate}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments</p>
        )}
      </div>
      <Comment />
    </>
  );
}

export default Post;
