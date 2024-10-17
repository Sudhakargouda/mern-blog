

import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import "./Header.css"; 

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <span className="logo-text">MyBlog</span>
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="nav-link">
              <span className="bold">Create new post</span>
            </Link>
            <a onClick={logout} className="nav-link">
              <span className="bold">Logout ({username})</span>
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="nav-link">
              <span className="bold">Login</span>
            </Link>
            <Link to="/register" className="nav-link">
              <span className="bold">Register</span>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
