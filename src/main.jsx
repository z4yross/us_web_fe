import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ContextProvider } from "./contexts/ContextProvider";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://us-ag-ms-mm2rw4nxna-rj.a.run.app/graphql",
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
			{/* <CookiesProvider> */}
			<App />
			{/* </CookiesProvider> */}
		</ContextProvider>
	</ApolloProvider>
);
