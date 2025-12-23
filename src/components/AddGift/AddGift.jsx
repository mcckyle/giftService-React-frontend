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
		if ( ! title.trim())
		{
			return;
		}
		
		const newGift = await createGift(personId, { title }, accessToken);
		setTitle("");
		onAdded(newGift);
	}
	
	return (
	  <form className="add-gift" onSubmit={submit}>
	    <input
		  className="add-gift-input"
		  placeholder="Add a gift idea..."
		  value={title}
		  onChange={(e) => setTitle(e.target.value)}
		  aria-label="Add gift idea"
		/>
		
		<button className="add-gift-button" type="submit">
		  Add
		</button>
	  </form>
	);
}