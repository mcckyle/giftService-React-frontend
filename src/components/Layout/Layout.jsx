//Filename: src/components/Layout/Layout.jsx

import { NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
	return (
	  <section className="layout">
	    <nav className="layout-nav">
		  <NavLink
		    to="/dashboard"
			className={({ isActive }) =>
			  `layout-link ${isActive ? "active" : ""}`
			}
		  >
		    Dashboard
		  </NavLink>
		  
		  <NavLink
		    to="/import"
			className={({ isActive }) =>
			  `layout-link ${isActive ? "active" : ""}`
			}
		  >
		    Import / Export
		  </NavLink>
		</nav>
		
		<main className="layout-content">
		  {children}
		</main>
	  </section>
	);
}