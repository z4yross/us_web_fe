import React, { useEffect, useState } from "react";

import { Login, Signup } from "../components";
import Logo from "../static/svg/logo.svg?component";

import { FiArrowLeft } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const In = () => {
	const [isLogin, setLogin] = useState(true);

    const navigate = useNavigate();

	return (
		<div className="LoginScreen">
            <FiArrowLeft className="BackButton" onClick={() => navigate(-1)}/>

			<div className="LogoContainer">
				<Logo className="LogoSVG" />
				<label className="LogoMame">UNSTREAM</label>
			</div>

			<div className="OptionSelector">
				{!isLogin && (
					<div
						className="OptionSelectorOption"
						onClick={() => setLogin(!isLogin)}
					>
						<label>Iniciar sesion</label>
					</div>
				)}
				{isLogin && (
					<div
						className="OptionSelectorOption"
						onClick={() => setLogin(!isLogin)}
					>
						<label>Registro</label>
					</div>
				)}
			</div>

			<div className="CredentialsContainer">
				<div
					className={`CredentialWrapper ${
						isLogin ? "EnterAnm" : "GoneAnm"
					}`}
				>
					{<Login />}
				</div>
				<div
					className={`CredentialWrapper ${
						!isLogin ? "EnterAnm" : "GoneAnm"
					}`}
				>
					{<Signup />}
				</div>
			</div>
		</div>
	);
};

export default In;
