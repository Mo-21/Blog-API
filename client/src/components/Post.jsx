import { useState, useEffect } from "react";

function usePosts() {
  const [postURL, setPostURL] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("api/posts");
        console.log(response);
        if (response.status >= 400) console.log(response);
        const actualPosts = await response.json();
        const data = actualPosts.map((post) => ({
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
  return { postURL, error, loading };
}

function Post() {
  const { postURL, error, loading } = usePosts();

  if (error) return <>{error}</>;
  if (loading)
    return <h1 style={{ color: "black", textAlign: "center" }}>LOADING...</h1>;

  return (
    <>
      {postURL.map((post) => (
        <>
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div>{post.author.username}</div>
        </>
      ))}
    </>
  );
}

export default Post;
