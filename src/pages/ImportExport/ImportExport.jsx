//Filename: src/pages/ImportExport/ImportExport.jsx

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./ImportExport.css";

export default function ImportExport() {
	const { accessToken } = useContext(AuthContext);
	const [fileName, setFileName] = useState("");
	const [status, setStatus] = useState("");
	
	async function handleExport() {
		setStatus("Exporting...");
		
		const response = await fetch("http://localhost:8080/api/export", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		
		if ( ! response.ok) {
			setStatus("Failed to export.");
			return;
		}
		
		const data = await response.json();
		
		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		});
		
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "giftplanner-export.json";
		a.click();
		
		URL.revokeObjectURL(url);
		setStatus("Export complete.");
	}
	
	async function handleImport(e) {
		const file = e.target.files[0];
		
		if ( ! file)
		{
			return;
		}
		
		setFileName(file.name);
		setStatus("Importing...");
		
		const text = await file.text();
		const json = JSON.parse(text);
		
		const response = await fetch("http://localhost:8080/api/import", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json),
		});
		
		if ( ! response.ok)
		{
			setStatus("Failed to import.");
			return;
		}
		
		setStatus("Import complete.");
	}
	
	return (
	  <section className="page-card import-export">
	    <h2 className="ie-title">Import / Export </h2>
		
		<div className="ie-card">
		  <h3>Export</h3>
		  <p>Your complete people + gift data in one file.</p>
		  
		  <button className="button" onClick={handleExport}>
		    Export Data
		  </button>
		</div>
		
		<div className="ie-card">
		  <h3>Import</h3>
		  <p>Restore your saved data from a previous export.</p>
		  
		  <label className="file-picker">
		    {fileName || "Choose JSON file"}
			<input
			  type="file"
			  accept="application/json"
			  onChange={handleImport}
			/>
		  </label>
		</div>
		
		{status && <div className="status-message">{status}</div>}
	  </section>
	);
};