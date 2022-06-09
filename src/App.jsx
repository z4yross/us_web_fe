import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { In, Stream } from "./pages";
import { NavBar } from "./components";

import "./static/styles/index.scss";
import { useStateContext } from "./contexts/ContextProvider";
import { useCookies } from "react-cookie";

function App() {

	const [cookies, setCookie] = useCookies(["user"]);

	const {setScreenSize, setCurrentUser} = useStateContext();

	useEffect(() => {
		setScreenSize([window.innerWidth, window.innerHeight])
		window.addEventListener("resize", () => setScreenSize([window.innerWidth, window.innerHeight]));
	}, []);

	useEffect(() => {
		setCurrentUser(cookies.user)
	}, [cookies])

	return (
		<div>
			<BrowserRouter  >
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
