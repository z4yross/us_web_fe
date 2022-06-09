import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ContextProvider } from "./contexts/ContextProvider";
import { CookiesProvider } from "react-cookie";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://home.z4yross.xyz:5000/graphql",
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			nextFetchPolicy: "no-cache",
		},
		query: {
			fetchPolicy: "no-cache",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<ContextProvider>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</ContextProvider>
	</ApolloProvider>
);
