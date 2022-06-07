import React, { useEffect, useRef, useState } from "react";

import { Player, NavBar, Chat } from "../components";

const Stream = () => {
	return (
		<div className="StreamPage">
			<NavBar />
			<div className="StreamWrapper">
				<div
					className="StreamContainer"
				>
					<Player />
					<Chat />
				</div>
			</div>
		</div>
	);
};

export default Stream;
