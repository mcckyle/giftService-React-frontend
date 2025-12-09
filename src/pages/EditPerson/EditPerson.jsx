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
	
	useEffect(() => {
		async function loadPerson() {
			const person = await getPerson(id, accessToken);
			
			if ( ! person)
			{
				console.warn("Could not find person: " + id);
				return;
			}
			
			setName(person.name);
		}
		loadPerson();
	}, [id, accessToken]);
	
	async function handleSave() {
		await updatePerson(id, { name }, accessToken);
		navigate("/dashboard");
	}
	
	return (
	  <section className="edit-person-container page-card">
	    <h2>Edit Person</h2>
		
		<div className="form-group">
		    <input
			  className="input"
			  value={name}
			  onChange={(e) => setName(e.target.value)}
			  placeholder="Person name"
			/>
		</div>
			
			<button className="button save-btn" onClick={handleSave}>
			  Save
			</button>
	  </section>
	);
}