import PostsProfile from "./FetchingPosts";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Welcome</h1>
      <PostsProfile />
      <Link to="/create">
        <button>Create New Article</button>
      </Link>
      <Logout />
    </>
  );
}

export default Dashboard;
