//Filename: src/main.jsx

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from './context/AuthContext';

import "./styles/theme.css";
import './index.css'
import "./styles/global.css";
import App from "./App.jsx";

//Apply persisted theme BEFORE React renders...
const htmlRoot = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "system";
if (savedTheme === "system")
{
	const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	htmlRoot.dataset.theme = isDark ? "dark" : "light";
}
else
{
	htmlRoot.dataset.theme = savedTheme;
}

//Apply persisted font size.
const savedFontSize = localStorage.getItem("fontSize") || "medium";
root.dataset.fontSize = savedFontSize;

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
	</AuthProvider>
  </React.StrictMode>
);