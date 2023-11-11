import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function useLogin(userEmail, userPassword) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const credentials = {
    email: userEmail,
    password: userPassword,
  };

  console.log(credentials);
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (response.status > 400) setStatus(response.status);
        const actualData = await response.json();
        setUsername(actualData.email);
        // setAccessToken(actualData.accessToken);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, []);
  return { username, status, error, loading };
}

function Credentials(userEmail, userPassword) {
  console.log(userEmail, userPassword);

  const { username, status, error, loading } = useLogin(
    userEmail,
    userPassword
  );

  if (error)
    return <h1 style={{ color: "black", textAlign: "center" }}>{error}</h1>;
  if (loading)
    return <h1 style={{ color: "black", textAlign: "center" }}>LOADING...</h1>;
  return (
    <>{status > 400 ? <p>Not Authorized</p> : <p>Welcome {username}</p>}</>
  );
}

Credentials.propTypes = {
  userEmail: PropTypes.string,
  userPassword: PropTypes.string,
};

export default Credentials;
