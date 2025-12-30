//Filename: src/components/AddGift/AddGift.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createGift } from "../../services/GiftService";
import "./AddGift.css";

export default function AddGift({ personId, onAdded }) {
	const { accessToken } = useContext(AuthContext);
	const [title, setTitle] = useState("");
	
	async function submit(e)
	{
		e.preventDefault();
		const trimmed = title.trim();
		if ( ! trimmed)
		{
			return;
		}
		
		const newGift = await createGift(personId, { title: trimmed }, accessToken);
		setTitle("");
		onAdded(newGift);
	}
	
	return (
	  <form className="add-gift" onSubmit={submit} aria-label="Add gift idea form">
	    <input
		  className="add-gift-input"
		  type="text"
		  placeholder="Add a gift idea..."
		  value={title}
		  onChange={(e) => setTitle(e.target.value)}
		  aria-label="Add gift idea"
		  autoComplete="off"
		/>
		
		<button className="add-gift-button" type="submit" disabled={ ! title.trim()}>
		  Add
		</button>
	  </form>
	);
}