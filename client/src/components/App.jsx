import { useState } from "react";
import "../styles/App.css";
import FetchingPosts from "./FetchingPosts";
import { Link } from "react-router-dom";

// function router() {
//   return (
//     <>
//       <ul className="navbar">
//         <li className="brand">Neon</li>
//         <Link to="/" style={{ textDecoration: "none" }}>
//           Home
//         </Link>
//         <Link to="/products" style={{ textDecoration: "none" }}>
//           Products
//         </Link>
//         <Link to="/cart" style={{ textDecoration: "none" }}>
//           Cart
//         </Link>
//       </ul>
//     </>
//   );
// }

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
