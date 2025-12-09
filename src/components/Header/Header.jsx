// Filename: src/components/Header.jsx

import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import "./Header.css";  // Import the CSS file here.

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
	  await logout(); //Call global logout logic.
	  navigate("/login"); //Redirect AFTER logout state is fully cleared.
  };
  
  //Close menu on outside click listener.
  useEffect(() => {
	  const close = (e) => {
		  if ( (avatarRef.current) && ( ! avatarRef.current.contains(e.target)) )
		  {
			  setMenuOpen(false);
		  }
	  };
	  
	  if (menuOpen)
	  {
		  document.addEventListener("mousedown", close);
	  }
	  return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);
  
  return (
	  <header className="header">
		<div className="header-container">
		
		  {/* Left Logo. */}
		  <Link className="logo-text" to="/">
		    Gift Planner
		  </Link>
		
		{/* Desktop Navigation. */}
		<nav className="nav-links">
		  <Link to="/" className="nav-link">Home</Link>
		  <Link to="/profile" className="nav-link">Profile</Link>
		</nav>
		
		{/* Right Side: Auth / User Avatar. */}
		<div className="auth-section">
		  {user ? (
		    <div
			  className="avatar-wrapper"
			  ref={avatarRef}
		      onClick={() => setMenuOpen((o) => ! o)}
			>
			  <div className="avatar-circle">
			    {user.username?.charAt(0)?.toUpperCase() ?? "?"}
			  </div>
			  
			  <div className={`avatar-menu ${menuOpen ? "open" : ""}`}>
			    <Link
				  to="/profile"
				  className="avatar-menu-item"
				  onClick={() => setMenuOpen(false)}
				>
				  Profile
				</Link>
				
				<div className="avatar-menu-divider" />
				
				<Link
				  to="/settings"
				  className="avatar-menu-item"
				  onClick={() => setMenuOpen(false)}
				>
				  Settings
				</Link>
				
				<button
				  className="avatar-menu-item logout"
				  onClick={handleLogout}
				>
				  Logout
				</button>
			  </div>
			</div>
		) : (
		  <>
		    <Link to="/login" className="btn auth-btn">Login</Link>
		    <Link to="/register" className="btn auth-btn register-btn">
			  Register
			</Link>
		  </>
		)}
		</div>
	  </div>
	</header>
  );
};

export default Header;