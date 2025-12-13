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
	  <div className="edit-gift-overlay" onClick={onClose}>
	    <div className="edit-gift-modal" onClick={(e) => e.stopPropagation()}>
		  <h2 className="modal-title">Edit Gift</h2>
		  
		  <div className="modal-field">
		    <label>Title</label>
			<input value={title} onChange={(e) => setTitle(e.target.value)} />
		  </div>
		  
		  <div className="modal-field">
		    <label>Notes</label>
			<textarea
			  value={notes}
			  onChange={(e) => setNotes(e.target.value)}
			  rows={3}
			/>
		  </div>
		  
		  <div className="modal-field">
		  <label>Price</label>
			<input
			  type="number"
			  min="0"
			  step="0.01"
			  value={price}
			  onChange={(e) => setPrice(e.target.value)}
			/>
		  </div>
		  
		  <div className="modal-field">
		  <label>URL</label>
			<input value={url} onChange={(e) => setUrl(e.target.value)} />
		  </div>
		  
		  <label className="purchased-toggle">
		    <input
			  type="checkbox"
			  checked={purchased}
			  onChange={(e) => setPurchased(e.target.checked)}
			/>
			  Mark as purchased
		  </label>
		  
		  <div className="modal-actions">
		    <button className="button" onClick={save}>Save</button>
			<button className="button ghost" onClick={onClose}>Cancel</button>
		  </div>
		</div>
	  </div>
	);
}