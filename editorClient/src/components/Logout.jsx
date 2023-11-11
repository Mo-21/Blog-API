import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout");
      const data = response.json();
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
      return <>{error}</>;
    }
  };

  return (
    <>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </>
  );
}

export default Logout;
