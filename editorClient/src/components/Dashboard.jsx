import { useNavigate } from "react-router-dom";
import PostsProfile from "./FetchingPosts";
import Logout from "./Logout";
import Cookies from "js-cookie";

function Dashboard() {
  const jwt = Cookies.get("jwt");
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome</h1>
      {jwt ? (
        <div>
          <PostsProfile /> <Logout />
        </div>
      ) : (
        <div>
          <h4>Nothing Here</h4>
          {navigate("/")}
        </div>
      )}
    </>
  );
}

export default Dashboard;
