//Filename: src/components/Layout/Layout.jsx

import { NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
	return (
	  <section className="layout">
	   <header className="layout-header">
	    <nav className="layout-nav" aria-label="Section navigation">
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
		    Import & Export
		  </NavLink>
		</nav>
	   </header>
		
		<main className="layout-content">
		  {children}
		</main>
	  </section>
	);
}