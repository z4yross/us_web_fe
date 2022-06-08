import React, { useEffect, useState } from "react";

import { FiAtSign, FiUser, FiKey, FiSend } from "react-icons/fi";

const Signup = () => {
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(
		"Por favor ingrese su informacion."
	);
	const [isError, setIsError] = useState(false);

	const send = () => {
		setLoading(false);
		setLoading(true);
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
				<input type="text" placeholder="Nombre de Usuario" />
			</div>
			<div className="EmailContainer">
				<FiAtSign />
				<input type="email" placeholder="Correo" />
			</div>
			<div className="PasswordContainer">
				<FiKey />
				<input type="password" placeholder="Contraseña" />
			</div>
			<div className="PasswordContainer">
				<FiKey />
				<input type="password" placeholder="Repita la contraseña" />
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
