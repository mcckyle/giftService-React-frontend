//Filename: App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Settings from "./components/Settings/Settings.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import PersonDetail from "./pages/PersonDetail/PersonDetail.jsx";
import EditPerson from "./pages/EditPerson/EditPerson.jsx";
import ImportExport from "./pages/ImportExport/ImportExport.jsx";
import PageContainer from "./components/Layout/PageContainer.jsx";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./App.css";

export default function App() {
  return (	
  <Router>
    <Header />
	
	  <PageContainer>
	    <Routes>
		  <Route path="/" element={<HomePage />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Register />} />

		  <Route path="/settings" element={<Settings />} />
		  <Route path="/dashboard" element={<Dashboard />} />
		  <Route path="/person/:id" element={<PersonDetail />} />
		  <Route path="/person/:id/edit" element={<EditPerson />} />

		  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
		  <Route path="/import" element={<PrivateRoute element={<ImportExport />} />} />
		  <Route path="*" element={<h2 className="not-found">Page Not Found</h2>} /> {/* Handle Undefined Routes. */}
		</Routes>
	  </PageContainer>
  </Router>
  );
}