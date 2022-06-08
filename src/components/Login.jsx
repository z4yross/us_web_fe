import React, { useEffect, useState } from "react";

import { FiAtSign, FiCheck, FiKey, FiSend } from "react-icons/fi";

const Login = () => {
	const [loading, setLoading] = useState(false);

    const [error, setError] = useState("Por favor ingrese su correo y contraseña.")
    const [isError, setIsError] = useState(false)

	const send = () => {
        setLoading(false)
		setLoading(true)
	};

    useEffect(() => {
        if(isError){
            setLoading(false);
        }
    }, [isError])

	return (
		<div className="Login">
            <div className={`InfoLabelContainer ${isError ? "ErrorLabel": ""}`}>
                <label>{error}</label>
            </div>
			<div className="EmailContainer">
				<FiAtSign />
				<input type="email" placeholder="Correo" />
			</div>
			<div className="PasswordContainer">
				<FiKey />
				<input type="password" placeholder="Contraseña" />
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
