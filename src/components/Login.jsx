import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { FiAtSign, FiCheck, FiKey, FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { VALIDATE_USER } from "../data/gql/mutations";
import { GET_ID_FROM_USERNAME } from "../data/gql/queries";

import { useLocalStorage } from "../hooks";

const Login = () => {
	const [userStorage, setUserStorage] = useLocalStorage("user", "");

	const [email, setEmail] = useState("");
	const [psw1, setPsw1] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(
		"Por favor ingrese su correo y contraseña."
	);
	const [isError, setIsError] = useState(false);

	const { currentUser, setCurrentUser } = useStateContext();
	const navigate = useNavigate();

	const [validateUser, user] = useMutation(VALIDATE_USER);

	const [getUser, UserData] = useLazyQuery(GET_ID_FROM_USERNAME, {
		fetchPolicy: "no-cache",
		onCompleted: (data) => {
			const fnlUser = {
				username: currentUser.username,
				id: data.GetId.id,
				email: currentUser.email,
			};
			setCurrentUser(fnlUser);
			setLoading(false);
			setUserStorage(JSON.stringify(fnlUser));
			navigate(`/${fnlUser.username}`);
		},
		onError: (error) => {
			setLoading(false);
			setIsError(true);
			setError(`${error.message}`);
		},
	});

	const send = () => {
		setLoading(false);
		setLoading(true);

		validateUser({
			variables: {
				user: {
					email: email,
					password: psw1,
				},
			},
			onCompleted: (data) => {
				const username = JSON.parse(
					atob(data.ValidateUser.token.split(".")[1])
				).username;
				setCurrentUser({ username: username, email: email });
				getUser({ variables: { username: username } });
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
			<button
				className={`SubmitLoginButton ${loading ? "loading" : ""}`}
				onClick={send}
			>
				<label>ENTRAR</label>
				<FiSend />
			</button>
		</div>
	);
};

export default Login;
