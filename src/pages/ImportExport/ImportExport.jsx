//Filename: src/pages/ImportExport/ImportExport.jsx

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./ImportExport.css";

export default function ImportExport() {
	const { accessToken } = useContext(AuthContext);
	const [fileName, setFileName] = useState("");
	const [status, setStatus] = useState("");
	
	async function handleExport() {
		setStatus("Exporting data...");
		
		try
		{
			const response = await fetch("http://localhost:8080/api/export", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			
			if ( ! response.ok) {
				throw new Error();
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
			setStatus("Export complete!");
		}
		catch
		{
			setStatus("Export failed!");
		}
	}
	
	async function handleImport(e) {
		const file = e.target.files[0];
		
		if ( ! file)
		{
			return;
		}
		
		setFileName(file.name);
		setStatus("Importing data...");
		
		try
		{
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
				throw new Error();
			}
			
			setStatus("Import complete.");
		}
		catch
		{
			setStatus("Import failed!");
		}
	}
	
	return (
	  <section className="import-export">
	    <header className="ie-header">
		  <h1 className="ie-title">Import & Export </h1>
		  <p className="ie-subtitle">
		    Back up your data or restore it from a previous save.
		  </p>
		</header>
		
		<div className="ie-card">
		  <h3>Export Data</h3>
		  <p>Download a complete backup of your people and gifts.</p>
		  
		  <button className="button" onClick={handleExport}>
		    Export JSON
		  </button>
		</div>
		
		<div className="ie-card">
		  <h3>Import Data</h3>
		  <p>Restore your planner from an exported JSON file.</p>
		  
		  <label className="file-picker">
		    {fileName || "Choose JSON file"}
			<input
			  type="file"
			  accept="application/json"
			  onChange={handleImport}
			/>
		  </label>
		</div>
		
		{status && <p className="ie-status">{status}</p>}
	  </section>
	);
};