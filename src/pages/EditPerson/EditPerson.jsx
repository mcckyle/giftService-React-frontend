//Filename: src/pages/EditPerson/EditPerson.jsx

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getPerson, updatePerson } from "../../services/PeopleService";

import "./EditPerson.css";

export default function EditPerson() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { accessToken } = useContext(AuthContext);
	
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		async function loadPerson() {
			const person = await getPerson(id, accessToken);
			
			if ( ! person)
			{
				navigate("/dashboard");
				return;
			}
			
			setName(person.name);
			setLoading(false);
		}
		loadPerson();
	}, [id, accessToken, navigate]);
	
	async function handleSave() {
		if ( ! name.trim())
		{
			return;
		}
		
		await updatePerson(id, { name }, accessToken);
		navigate("/dashboard");
	}
	
	if (loading)
	{
		return null;
	}
	
	return (
	  <section className="edit-person">
	    <header className="edit-person-header">
		  <h1>Edit Person</h1>
		  <p>Update the name associated with this gift list.</p>
		</header>
		
		<div className="edit-person-field">
		  <label htmlFor="name">Name</label>
		    <input
			  id="name"
			  value={name}
			  onChange={(e) => setName(e.target.value)}
			  placeholder="Person name"
			  autoFocus
			/>
		</div>
		
		<div className="edit-person-actions">
		  <button className="btn" onClick={handleSave}>
		    Save
		  </button>
		  <button
		    className="btn btn-ghost"
			onClick={() => navigate("/dashboard")}
		  >
		    Cancel
		  </button>
		</div>
	  </section>
	);
}