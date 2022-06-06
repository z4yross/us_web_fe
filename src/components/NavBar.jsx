import React, { useState } from "react";

import { FiUser, FiSearch } from "react-icons/fi";

import Logo from "../static/svg/logo.svg?component";

const NavBar = () => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className="NavBar">
			<div className="ContainerBar">
				<div className="MainLogo">
					<Logo />
					<p>UNSTREAM</p>
				</div>
				<div className="SearchBar">
					<input type="text" placeholder="Buscar"></input>
					<button type="button">
						<FiSearch />
					</button>
				</div>
				<div className="Profile">
					<FiUser />
				</div>
			</div>
			<div className="LoadingBar">
				<div
					className={`LoadingAsset ${isLoading ? "animate" : ""}`}
				></div>
			</div>
		</div>
	);
};

export default NavBar;
