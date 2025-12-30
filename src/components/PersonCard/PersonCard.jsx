//Filename: src/components/PersonCard/PersonCard.jsx

import { Link } from "react-router-dom";
import "./PersonCard.css";

export default function PersonCard({ person, onDelete }) {
	return (
	  <article className="person-card">
	    <header className="person-card-header">
		  <span className="person-eyebrow">Recipient</span>
		  <h3 className="person-name">{person.name}</h3>
		</header>
		
		<footer className="person-actions">
		  <Link to={`/person/${person.id}`} className="person-link primary">
		    View Gifts
		  </Link>
		  
		  <Link to={`/person/${person.id}/edit`} className="person-link subtle">
		    Edit
		  </Link>
		  
		  <button
		    type="button"
		    className="person-link danger"
			onClick={() => onDelete(person.id)}
		  >
		    Delete
		  </button>
	    </footer>
	  </article>
	);
}