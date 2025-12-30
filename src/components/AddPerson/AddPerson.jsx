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
		const trimmed = name.trim();
		if ( ! trimmed)
		{
			return;
		}
		
		const newPerson = await createPerson({ name: trimmed }, accessToken);
		setName("");
		onAdded(newPerson);
	}
	
	return (
	  <form
	    className="add-person"
	    onSubmit={submit}
	    aria-label="Add person form"
	  >
	    <input
		  className="add-person-input"
		  type="text"
		  placeholder="Add a person..."
		  value={name}
		  onChange={(e) => setName(e.target.value)}
		  aria-label="Person name"
		  autoComplete="off"
		/>
		
		<button
		  className="add-person-button"
		  type="submit"
		  disabled={!name.trim()}
		>
		  Add
		</button>
	  </form>
	);
}