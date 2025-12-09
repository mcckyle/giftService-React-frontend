//Filename: src/components/Layout/Layout.jsx

import { Link } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
	return (
	  <div className="layout-shell">
	    <nav className="layout-nav">
		  <Link to="/dashboard" className="nav-link">Dashboard</Link>
		  <Link to="/import" className="nav-link">Import / Export</Link>
		</nav>
		
		<main className="layout-content">
		  {children}
		</main>
	  </div>
	);
}