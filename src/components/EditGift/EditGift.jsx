//Filename: src/components/EditGift/EditGift.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateGift } from "../../services/GiftService";
import "./EditGift.css";

export default function EditGift({ gift, onClose, onUpdated }) {
	const { accessToken } = useContext(AuthContext);
	
	const [title, setTitle] = useState(gift.title);
	const [notes, setNotes] = useState(gift.notes || "");
	const [price, setPrice] = useState(gift.price || "");
	const [url, setUrl] = useState(gift.url || "");
	const [purchased, setPurchased] = useState(gift.purchased);
	
	async function save() {
		const payload = {
			title,
			notes,
			price: price ? Number(price) : null,
			url,
			purchased,
		};
		
		const updated = await updateGift(gift.id, payload, accessToken);
		onUpdated(updated);
		onClose();
	}
	
	return (
	  <div className="edit-gift-overlay">
	    <div className="edit-gift-modal">
		  <h2>Edit Gift</h2>
		  
		  <label>
		    Title
			<input value={title} onChange={(e) => setTitle(e.target.value)} />
		  </label>
		  
		  <label>
		    Notes
			<textarea
			  value={notes}
			  onChange={(e) => setNotes(e.target.value)}
			/>
		  </label>
		  
		  <label>
		    Price
			<input
			  type="number"
			  min="0"
			  step="0.01"
			  value={price}
			  onChange={(e) => setPrice(e.target.value)}
			/>
		  </label>
		  
		  <label>
		    URL
			<input value={url} onChange={(e) => setUrl(e.target.value)} />
		  </label>
		  
		  <label className="purchased-check">
		    <input
			  type="checkbox"
			  checked={purchased}
			  onChange={(e) => setPurchased(e.target.checked)}
			/>
			  Mark as purchased
		  </label>
		  
		  <div className="edit-gift-actions">
		    <button className="button" onClick={save}>Save</button>
			<button className="button ghost" onClick={onClose}>Cancel</button>
		  </div>
		</div>
	  </div>
	);
}