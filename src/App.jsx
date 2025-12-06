//Filename: App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import PageContainer from "./components/Layout/PageContainer.jsx";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./App.css";

const App = () => (
  <Router>
    <Header />
	
	  <PageContainer>
	    <Routes>
		  <Route path="/login" element={<Login />} />
		  <Route path="/register" element={<Login />} />
		</Routes>
	  </PageContainer>
  </Router>
);

export default App;
