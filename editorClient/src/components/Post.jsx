import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useGetPost() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const param = useParams();
  const link = `/api/posts/${param.postId}`;
  console.log(link);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) throw new Error("Not Authorized");
        const data = await response.json();
        console.log(data);
        setPost({
          title: data.title,
          content: data.content,
          createdAt: data.createdAt,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  return { post, error, loading };
}

function Post() {
  const { post, error, loading } = useGetPost();
  if (error)
    return <h1 style={{ color: "black", textAlign: "center" }}>{error}</h1>;
  if (loading)
    return <h1 style={{ color: "black", textAlign: "center" }}>LOADING...</h1>;
  return (
    <>
      {
        <div key={post.id}>
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div>{post.username}</div>
        </div>
      }
      {error && <p>{error}</p>}
    </>
  );
}

export default Post;
