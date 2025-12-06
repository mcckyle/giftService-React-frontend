//Filename: src/components/Profile.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css"; // Import the CSS file.

const Profile = () => {
	const navigate = useNavigate();
	const { user, accessToken, logout, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(!user);
	const [error, setError] = useState("");
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({ username: "", email: "", bio: "" });
	const [saving, setSaving] = useState(false);
	
	const handleLogout = async () => {
		await logout();
		navigate("/signin", { replace: true });
	};
	
	//Open edit modal.
	const handleOpenEdit = () => {
		setEditData({
		username: user.username || "",
		email: user.email || "",
		bio: user.bio || "",
	  });
	  setOpenEdit(true);
	};
	
	const handleCloseEdit = () => setOpenEdit(false);
	
	const handleEditChange = (e) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};
	
	//Save profile changes.
	const handleSaveChanges = async () => {
		try
		{
			setSaving(true);
			
			const response = await fetch("http://localhost:8080/api/users/update", {
				method: "PUT",
				credentials: "include", //Use cookie-based auth.
				headers: {
					"Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(editData),
			});
			
			if ( ! response.ok)
			{
				throw new Error("Failed to update profile!");
			}
			
			const result = await response.json();
			setUser(result.user);
			setOpenEdit(false);
		}
		catch (error)
		{
			setError(error.message);
		}
		finally
		{
			setSaving(false);
		}
	};
	
	//Early return if user is null.
	if ( ! user)
	{
		return (
		  <p>Redirecting...</p>
		);
	}
	
	return (
	  <div className="profile-container">
	    <h1 className="profile-title">Welcome, {user.username}!</h1>
		
		<div className="profile-card">
		  <p><strong>Email:</strong> {user.email}</p>
		  <p><strong>Bio:</strong> {user.bio || "No bio yet."}</p>
		  <div className="profile-actions">
		    <button className="btn btn-edit" onClick={handleOpenEdit}>Edit Profile</button>
			<button className="btn btn-logout" onClick={handleLogout}>Logout</button>
		  </div>
		  {error && <p className="profile-error">{error}</p>}
		</div>
		
		{openEdit && (
		  <div className="edit-modal">
		    <div className="edit-card">
			  <h2>Edit Profile</h2>
			  <input
			    name="username"
				value={editData.username}
				onChange={handleEditChange}
				placeholder="Username"
			  />
			  <input
			    name="email"
				value={editData.email}
				onChange={handleEditChange}
				placeholder="Email"
				type="email"
			  />
			  <textarea
			    name="bio"
				value={editData.bio}
				onChange={handleEditChange}
				placeholder="Bio"
			  />
			  <div className="edit-actions">
			    <button
				  className="btn btn-save"
				  onClick={handleSaveChanges}
				  disabled={saving}
				>
				  {saving ? "Saving..." : "Save"}
				</button>
				<button className="btn btn-cancel" onClick={handleCloseEdit}>Cancel</button>
			  </div>
			</div>
		  </div>
		)}
	  </div>		  
    );
};

export default Profile;