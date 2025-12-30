//Filename: src/components/EditGift/EditGift.jsx

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateGift, deleteGift } from "../../services/GiftService";
import "./EditGift.css";

export default function EditGift({ gift, onClose, onUpdated, onDeleted }) {
	const { accessToken } = useContext(AuthContext);
	const [deleting, setDeleting] = useState(false);
	const [saving, setSaving] = useState(false);
	
	const [title, setTitle] = useState(gift.title);
	const [notes, setNotes] = useState(gift.notes || "");
	const [price, setPrice] = useState(gift.price || "");
	const [url, setUrl] = useState(gift.url || "");
	const [purchased, setPurchased] = useState(gift.purchased);
	
	async function save() {
		if (saving)
		{
			return;
		}
		
		setSaving(true);
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
	
	async function handleDelete() {
		const confirmed = window.confirm(
		  `Delete "${gift.title}"? This cannot be undone.`
		);
		
		if ( ! confirmed)
		{
			return;
		}
		
		setDeleting(true);
		
		try
		{
			await deleteGift(gift.id, accessToken);
			onDeleted(gift.id);
			onClose();
		}
		catch (error)
		{
			//console.error(error);
			alert("Failed to delete gift.");
		}
		finally
		{
			setDeleting(false);
		}
	}
	
	return (
	  <div className="edit-gift-overlay" onClick={onClose}>
	    <div
		  className="edit-gift-modal"
		  onClick={(e) => e.stopPropagation()}
		  role="dialog"
		  aria-modal="true"
		>
		  <header className="edit-gift-header">
		    <h2 className="edit-gift-title">Edit Gift</h2>
			<p className="edit-gift-subtitle">
			  Update details or mark this gift as purchased.
			</p>
		  </header>
		  
		  <div className="edit-gift-field">
		    <label>Title</label>
			<input
			  value={title}
			  onChange={(e) => setTitle(e.target.value)}
			/>
		  </div>
		  
		  <div className="edit-gift-field">
		    <label>Notes</label>
			<textarea
			  rows={3}
			  value={notes}
			  onChange={(e) => setNotes(e.target.value)}
			/>
		  </div>
		  
		  <div className="edit-gift-field">
		    <label>Price</label>
			  <input
			    type="number"
			    min="0"
			    step="0.01"
			    value={price}
			    onChange={(e) => setPrice(e.target.value)}
			  />
		  </div>
		  
		  <div className="edit-gift-field">
		    <label>Link</label>
			  <input value={url} onChange={(e) => setUrl(e.target.value)} />
		  </div>
		  
		  <label className="edit-gift-toggle">
		    <input
			  type="checkbox"
			  checked={purchased}
			  onChange={(e) => setPurchased(e.target.checked)}
			/>
			  <span>Mark as purchased</span>
		  </label>
		  
		  <div className="edit-gift-actions">
		    <button className="button" onClick={save} disabled={saving}>
			  Save changes
			</button>
			
			<button className="button ghost" onClick={onClose} type="button">
			  Cancel
			</button>
			
			<button
			  className="gift-delete-btn"
			  onClick={handleDelete}
			  disabled={deleting}
			  type="button"
			>
			  Delete
			</button>
		  </div>
		</div>
	  </div>
	);
}