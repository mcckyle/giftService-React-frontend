//Filename: src/components/Profile.jsx

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css"; // Import the CSS file.

const Profile = () => {
	const navigate = useNavigate();
	const { user, logout, accessToken, setUser } = useContext(AuthContext);
	
	const [openEdit, setOpenEdit] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	
	const [editData, setEditData] = useState({
		username: "",
		email: "",
		bio: ""
	});
	
	function openEditor() {
		setEditData({
			username: user.username || "",
			email: user.email || "",
			bio: user.bio || "",
		});
		setOpenEdit(true);
	}
	
	function closeEditor() {
		setOpenEdit(false);
	}
	
	function handleChange(e) {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};
	
	//Save profile changes.
	async function handleSave() {
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
	
	async function handleLogout() {
		await logout();
		navigate("/signin", { replace: true });
	}
	
	//Early return if user is null.
	if ( ! user)
	{
		return (
		  <p>Redirecting...</p>
		);
	}
	
	return (
	  <section className="page-card profile-card">
	    <h1 className="profile-title">Welcome, {user.username}!</h1>
		
		<div className="profile-info">
		  <p><strong>Email:</strong> {user.email}</p>
		  <p><strong>Bio:</strong> {user.bio || "No bio yet."}</p>
		</div>
		
		<div className="profile-actions">
		    <button className="button" onClick={openEditor}>Edit Profile</button>
			<button className="button danger" onClick={handleLogout}>Logout</button>
		  </div>
		  
		  {error && <p className="profile-error">{error}</p>}
		  
		  {/* Modal */}
		  {openEdit && (
		   <div className="modal-overlay">
		    <div className="modal-card">
			  <h2>Edit Profile</h2>
			  
			  <input
			    className="input"
			    name="username"
				value={editData.username}
				onChange={handleChange}
				placeholder="Username"
			  />
			  
			  <input
			    className="input"
				type="email"
			    name="email"
				value={editData.email}
				onChange={handleChange}
				placeholder="Email"
			  />
			  
			  <textarea
			    className="input textarea"
			    name="bio"
				value={editData.bio}
				onChange={handleChange}
				placeholder="Bio"
			  />
			  
			  <div className="modal-actions">
			    <button
				  className="button"
				  onClick={handleSave}
				  disabled={saving}
				>
				  {saving ? "Saving..." : "Save"}
				</button>
				
				<button className="button secondary" onClick={closeEditor}>
				  Cancel
				</button>
			  </div>
			</div>
		  </div>
		)}
	  </section>		  
    );
};

export default Profile;