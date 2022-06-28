import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { In, Stream } from "./pages";
import { NavBar } from "./components";

import "./static/styles/index.scss";
import { useStateContext } from "./contexts/ContextProvider";

import { useLocalStorage } from "./hooks";

function App() {
	const [userStorage, setUserStorage] = useLocalStorage("user", "");

	const { setScreenSize, setCurrentUser } = useStateContext();

	useEffect(() => {
		setScreenSize([window.innerWidth, window.innerHeight]);
		window.addEventListener("resize", () =>
			setScreenSize([window.innerWidth, window.innerHeight])
		);
	}, []);

	useEffect(() => {
		console.log(userStorage)
		try{
			setCurrentUser(JSON.parse(userStorage));
		}catch(error){
			setCurrentUser("");
		}
		
	}, [userStorage]);

	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* dashboard  */}
					<Route path="/" element={<In />} />
					<Route path="/login" element={<In />} />
					<Route path="/:user" element={<Stream />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
