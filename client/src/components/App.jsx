import "../styles/App.css";
import FetchingPosts from "./FetchingPosts";

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
      <FetchingPosts />
    </>
  );
}

export default App;
