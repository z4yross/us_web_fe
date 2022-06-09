import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { FiAtSign, FiUser, FiKey, FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { CREATE_USER } from "../data/gql/mutations";
import { GET_USERNAME_FROM_ID } from "../data/gql/queries";

const Signup = () => {
	const [cookies, setCookie] = useCookies(["user"]);

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState("Por favor ingrese su informacion.");
	const [isError, setIsError] = useState(false);

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [psw1, setPsw1] = useState("");
	const [psw2, setPsw2] = useState("");

	const { currentUser, setCurrentUser } = useStateContext();

	const [createUser, user] = useMutation(CREATE_USER);

	const [getUser, UserData] = useLazyQuery(GET_USERNAME_FROM_ID, {
		fetchPolicy: "no-cache",
		onCompleted: (data) => {
			const fnlUser = {
				username: data.GetUser.username,
				id: currentUser.id,
				email: currentUser.email,
			};
			setCurrentUser(fnlUser);
			setLoading(false);
			setCookie("user", JSON.stringify(fnlUser), { path: "/" });
			navigate(`/${data.GetUser.username}`);
		},
		onError: (error) => {
			setLoading(false);
			setIsError(true);
			setError(`${error.message}`);
		},
	});

	const navigate = useNavigate();

	const send = () => {
		setLoading(false);
		setLoading(true);

		createUser({
			variables: {
				user: {
					Email: email,
					Password: psw1,
					Status: true,
					UserName: username,
				},
			},
			onCompleted: (data) => {
				const id = JSON.parse(
					atob(data.CreateUser.token.split(".")[1])
				).user_id;
				setCurrentUser({ id: id, email: email });
				getUser({ variables: { id: id } });
				// getUser({ variables: { email: email } });
			},
			onError: (error) => {
				setLoading(false);
				setIsError(true);
				setError(`${error.message}`);
			},
		});
	};

	useEffect(() => {
		if (isError) {
			setLoading(false);
		}
	}, [isError]);

	return (
		<div className="Login">
			<div
				className={`InfoLabelContainer ${isError ? "ErrorLabel" : ""}`}
			>
				<label>{error}</label>
			</div>
			<div className="UserNameContainer">
				<FiUser />
				<input
					type="text"
					placeholder="Nombre de Usuario"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="EmailContainer">
				<FiAtSign />
				<input
					type="email"
					placeholder="Correo"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="PasswordContainer">
				<FiKey />
				<input
					type="password"
					placeholder="Contraseña"
					value={psw1}
					onChange={(e) => setPsw1(e.target.value)}
				/>
			</div>
			<div className="PasswordContainer">
				<FiKey />
				<input
					type="password"
					placeholder="Repita la contraseña"
					value={psw2}
					onChange={(e) => setPsw2(e.target.value)}
				/>
			</div>
			<button
				className={`SubmitLoginButton ${loading ? "loading" : ""}`}
				onClick={send}
			>
				<label>REGISTRO</label>
				<FiSend />
			</button>
		</div>
	);
};

export default Signup;
