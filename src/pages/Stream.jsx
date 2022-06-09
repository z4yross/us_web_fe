import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { Player, NavBar, Chat } from "../components";

import {
	GET_USERNAME_FROM_ID,
	GET_STREAM_STATE,
	GET_ID_FROM_USERNAME,
} from "../data/gql/queries";

import HLS from "../static/urls/hls";

const Stream = () => {
	let params = useParams();

	const [streamState, setData] = useState({})

	const [getStream, { loading, error }] = useLazyQuery(
		GET_STREAM_STATE,
		{
			pollInterval: 15 * 1000,
			onCompleted: (d) => {setData(d.getStreamState)}
		}
	);

	const userQuery = useQuery(GET_ID_FROM_USERNAME, {
		variables: { username: `${params.user}` },
		onCompleted: (data) => {
			getStream({ variables: { uid: `${data.GetId.id}` } });
		},
	});

	return (
		<div className="StreamPage">
			<NavBar />
			<div className="StreamWrapper">
				<div className="StreamContainer">
					<Player
						url={
							loading || error
								? ""
								: `${HLS}${streamState.path}`
						}
						state={
							loading || error
								? false
								: streamState.state === "true"
						}
						user={params.user}
					/>
					<Chat />
				</div>
			</div>
		</div>
	);
};

export default Stream;
