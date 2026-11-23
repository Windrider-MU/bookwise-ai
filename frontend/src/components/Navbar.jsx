import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link className="brand" to="/">
          <span className="brand-mark">B</span>
          BookWise AI
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/advisor">AI Advisor</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link className="button button-small" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="nav-user">Hi, {user?.name}</span>

              <button
                className="button button-outline button-small"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}