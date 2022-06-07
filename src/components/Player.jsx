import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useStateContext } from "../contexts/ContextProvider";

import Logo from "../static/svg/logo.svg?component";


const Player = () => {
	const parentDiv = useRef(null);

	const [playerSize, setPlayerSize] = useState([]);
	const { screenSize } = useStateContext();

	useEffect(() => {
		if (parentDiv.current && parentDiv.current.clientWidth > 0) {
			if (screenSize[0] <= 1130)
				parentDiv.current.style.setProperty(
					"flex",
					`0 0 ${(parentDiv.current.clientWidth * 9) / 16}px`,
					"important"
				);
			else
				parentDiv.current.style.setProperty(
					"flex",
					`2 1 700px`,
					"important"
				);
			setPlayerSize([
				parentDiv.current.clientWidth,
				(parentDiv.current.clientWidth * 9) / 16,
			]);
		}
	}, [parentDiv]);

	useEffect(() => {
		if (screenSize[0] > 0) {
			if (screenSize[0] <= 1130)
				parentDiv.current.style.setProperty(
					"flex",
					`0 0 ${(parentDiv.current.clientWidth * 9) / 16}px`,
					"important"
				);
			else
				parentDiv.current.style.setProperty(
					"flex",
					`2 1 700px`,
					"important"
				);

			setPlayerSize([
				parentDiv.current.clientWidth,
				(parentDiv.current.clientWidth * 9) / 16,
			]);
		}
	}, [screenSize]);

	return (
		<div className="Stream" ref={parentDiv}>
			<div className="PlayerWrapper">
				<ReactPlayer
					controls={true}
					playing={false}
					width={playerSize[0]}
					height={playerSize[1]}
					url="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
				/>
			</div>
			<div className="InfoWrapper">
				<div className="InfoTitle">
					<div className="InfoTilteLabel">Streamer:</div>
					<div className="InfoTilteData">Usuario</div>
				</div>
				<div className="ExtraInfo">
					<div className="status">
						<div className="online">En linea</div>
						<Logo />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Player;
