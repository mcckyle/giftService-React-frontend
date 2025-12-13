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
			
			if (person)
			{
				
				return;
			}
			else
			{
				setName(person.name);
				console.warn("Could not find person: " + id);
			}
		}
		loadPerson();
	}, [id, accessToken]);
	
	async function handleSave() {
		await updatePerson(id, { name }, accessToken);
		navigate("/dashboard");
	}
	
	return (
	  <section className="edit-person">
	    <h1 className="edit-person-title">Edit Person</h1>
		
		<div className="edit-person-field">
		  <label>Name</label>
		    <input
			  className="edit-person-input"
			  value={name}
			  onChange={(e) => setName(e.target.value)}
			  placeholder="Person name"
			/>
		</div>
			
			<button className="edit-person-save" onClick={handleSave}>
			  Save
			</button>
	  </section>
	);
}