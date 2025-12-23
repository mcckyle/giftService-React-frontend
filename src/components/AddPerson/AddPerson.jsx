//Filename: src/components/AddPerson/AddPerson.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createPerson } from "../../services/PeopleService";
import "./AddPerson.css";

export default function AddPerson({ onAdded }) {
	const { accessToken } = useContext(AuthContext);
	const [name, setName] = useState("");
	
	async function submit(e)
	{
		e.preventDefault();
		if ( ! name.trim())
		{
			return;
		}
		
		const newPerson = await createPerson({ name }, accessToken);
		setName("");
		onAdded(newPerson);
	}
	
	return (
	  <form className="add-person" onSubmit={submit}>
	    <input
		  className="add-person-input"
		  placeholder="Add someone..."
		  value={name}
		  onChange={(e) => setName(e.target.value)}
		  aria-label="Add person"
		/>
		
		<button className="add-person-button" type="submit">
		  Add Person
		</button>
	  </form>
	);
}