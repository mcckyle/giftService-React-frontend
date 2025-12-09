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
	  <form className="add-person-form" onSubmit={submit}>
	    <input
		  className="input"
		  placeholder="Add someone..."
		  value={name}
		  onChange={(e) => setName(e.target.value)}
		/>
		
		<button className="button" type="submit">
		  Add
		</button>
	  </form>
	);
}