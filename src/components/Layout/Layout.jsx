//Filename: src/components/Layout/Layout.jsx

import { NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
	return (
	  <div className="layout-shell">
	    <nav className="layout-nav">
		  <NavLink to="/dashboard" className="nav-link">
		    Dashboard
		  </NavLink>
		  
		  <NavLink to="/import" className="nav-link">
		    Import / Export
		  </NavLink>
		</nav>
		
		<main className="layout-content">
		  {children}
		</main>
	  </div>
	);
}