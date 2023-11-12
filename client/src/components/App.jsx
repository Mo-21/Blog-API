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

export function Footer() {
  return (
    <footer>
      <div className="footer-group">
        <div className="name">Mohammad Malaeb</div>
        <div className="rights">All Rights Reserved 2023 &copy;</div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Navbar></Navbar>
      <User />
      <h1 className="break">DevBlog</h1>
      <FetchingPosts />
      <Footer />
    </>
  );
}

export default App;
