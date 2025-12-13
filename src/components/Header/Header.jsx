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
		<div className="header-inner">
		
		  {/* Left Logo. */}
		  <Link to="/" className="logo">
		    Gift Planner
		  </Link>
		
		{/* Desktop Navigation. */}
		<nav className="nav">
		  <Link to="/" className="nav-item">Home</Link>
		  <Link to="/dashboard" className="nav-item">Dashboard</Link>
		  <Link to="/profile" className="nav-item">Profile</Link>
		</nav>
		
		{/* Right Side: Auth / User Avatar. */}
		<div className="right">
		  {user ? (
		    <div
			  className="avatar-area"
			  ref={avatarRef}
		      onClick={() => setMenuOpen((o) => ! o)}
			>
			  <div className="avatar">
			    {user.username?.charAt(0)?.toUpperCase() ?? "?"}
			  </div>
			  
			  <div className={`menu ${menuOpen ? "open" : ""}`}>
			    <Link to="/profile" className="menu-item">Profile</Link>
				<Link to="/settings" className="menu-item">Settings</Link>
				<div className="menu-divider" />
				<button className="menu-item logout" onClick={handleLogout}>
				  Logout
				</button>
			  </div>
			</div>
		) : (
		  <div className="auth-actions">
		    <Link to="/login" className="auth-link">Login</Link>
		    <Link to="/register" className="auth-link primary">Register</Link>
		  </div>
		)}
		</div>
	  </div>
	</header>
  );
};

export default Header;