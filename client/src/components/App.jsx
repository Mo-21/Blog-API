import "../styles/App.css";
import FetchingPosts from "./FetchingPosts";
import User from "./UserDetails";

export function Navbar() {
  return (
    <>
      <div className="title">Mo's Blog</div>
    </>
  );
}

function App() {
  return (
    <>
      <Navbar></Navbar>
      <User />
      <FetchingPosts />
    </>
  );
}

export default App;
