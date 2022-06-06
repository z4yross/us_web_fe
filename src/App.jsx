import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { In, Stream } from "./pages";
import { NavBar } from "./components";

import './static/styles/index.scss'

function App() {
	return (
		<div>
			<BrowserRouter>
        <NavBar/>
				<Routes>
					{/* dashboard  */}
					<Route path="/login" element={<In />} />
					<Route path="/stream" element={<Stream />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
