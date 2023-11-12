import PostsProfile from "./FetchingPosts";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <div className="title">Mo's Blog</div>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <Navbar />
      <PostsProfile />
      <Link to="/create">
        <button>Create New Article</button>
      </Link>
      <Logout />
    </>
  );
}

export default Dashboard;
