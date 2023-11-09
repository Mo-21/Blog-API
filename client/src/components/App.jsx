import { useState } from "react";
import "../styles/App.css";
import Post from "./Post";

function Navbar() {
  return (
    <>
      <div className="title">Mo's Blog</div>
    </>
  );
}

function App() {
  return (
    <>
      <Post></Post>
    </>
  );
}

export default App;
