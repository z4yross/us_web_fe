import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { In, Stream } from "./pages";
import { NavBar } from "./components";

import "./static/styles/index.scss";
import { useStateContext } from "./contexts/ContextProvider";

function App() {

	const {setScreenSize} = useStateContext();

	useEffect(() => {
		setScreenSize([window.innerWidth, window.innerHeight])
		window.addEventListener("resize", () => setScreenSize([window.innerWidth, window.innerHeight]));
	}, []);

	return (
		<div>
			<BrowserRouter>
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
