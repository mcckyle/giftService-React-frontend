//Filename: src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import PageContainer from "./components/Layout/PageContainer.jsx";
import PrivateRoute from "./components/auth/PrivateRoute";

import HomePage from "./pages/HomePage/HomePage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import PersonDetail from "./pages/PersonDetail/PersonDetail.jsx";
import EditPerson from "./pages/EditPerson/EditPerson.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Settings from "./components/Settings/Settings.jsx";
import ImportExport from "./pages/ImportExport/ImportExport.jsx";

import "./App.css";

export default function App() {
  return (	
  <Router>
    <Header />
	
	  <PageContainer>
	    <Routes>
		  {/* Public Routes. */}
		  <Route path="/" element={<HomePage />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Register />} />

          {/* Protected Routes. */}
		  <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
		  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
		  <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
		  <Route path="/import" element={<PrivateRoute element={<ImportExport />} />} />
		  
		  {/* Person Flow Routes. */}
		  <Route path="/person/:id" element={<PersonDetail />} />
		  <Route path="/person/:id/edit" element={<EditPerson />} />

          {/* Fallback Route. */}
		  <Route
		    path="*"
			element={<h2 className="not-found">Page not found</h2>}
		  /> {/* Handle Undefined Routes. */}
		</Routes>
	  </PageContainer>
  </Router>
  );
}