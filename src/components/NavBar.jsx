import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

import { FiUser, FiSearch, FiEye, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { SET_STREAM_KEY } from "../data/gql/mutations";

import Logo from "../static/svg/logo.svg?component";

import { useLocalStorage } from "../hooks";

const NavBar = () => {
	// const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [userStorage, setUserStorage] = useLocalStorage("user", "");

	const [isLoading, setIsLoading] = useState(false);

	const [searchUser, setSearchUser] = useState("");

	const { currentUser, setCurrentUser } = useStateContext();

	const [userOptions, setUserOptions] = useState(false);

	const [streamKey, setSetreamKey] = useState("");

	const [getStreamKey, keyData] = useMutation(SET_STREAM_KEY);

	const navigate = useNavigate();

	const handleClick = () => {
		if (currentUser && currentUser !== "") {
			setUserOptions(!userOptions);
		} else {
			navigate("/login");
		}
	};

	const handleSearch = () => {
		if (searchUser) navigate(`/${searchUser}`);
	};


	const handleLogout = () => {
		setUserStorage("")
		// removeCookie('user', { path: "/" });
		setUserOptions(false);
	}

	const handleShow = () => {
		getStreamKey({
			variables: {
				uid: currentUser.id
			},
			onCompleted: (data) => {
				setSetreamKey(`${currentUser.id}?key=${data.setStreamKey.key}`)
			}
		})
	}

	useEffect(() => {
		if(!userOptions) setSetreamKey("")
	}, [userOptions])

	return (
		<div className="NavBar">
			<div className="ContainerBar">
				<div className="MainLogo">
					<Logo />
					<p>UNSTREAM</p>
				</div>
				<div className="SearchBar">
					<input
						type="text"
						placeholder="Buscar"
						value={searchUser}
						onChange={(e) => {
							setSearchUser(e.target.value);
						}}
					></input>
					<button type="button" onClick={handleSearch}>
						<FiSearch />
					</button>
				</div>
				<div className="Profile" onClick={handleClick}>
					<FiUser />
				</div>
				<div
					className={`UserOptionsWrapper ${
						!userOptions ? "hideWrapper" : ""
					}`}
				>
					<div
						className={`UserOptions ${!userOptions ? "hide" : ""}`}
					>
						<div className="WelcomeLabel">
							<label>
								Bienvenido{" "}
								{currentUser ? currentUser.username : ""}
							</label>
							<label></label>
						</div>

						<div className="keyGenerator">
							<label>Llave de stream: </label>
							<div>
								<input
									type={streamKey ? "text" : "password"}
									value={
										streamKey
											? streamKey
											: "****************************"
									}
								/>
								<button onClick={handleShow}>
									<FiEye />
								</button>
							</div>
						</div>

						<button className="CloseSession" onClick={handleLogout}>
							<label>Salir</label>
							<FiLogOut />
						</button>
					</div>
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
