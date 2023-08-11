import React from "react";
import { HomeReducer, HomeInitialState } from "./Home.reducer";
import { HomeContext } from "./Home.context";

const HomeProvider = (props) => {
	const [state, dispatch] = React.useReducer(HomeReducer, HomeInitialState);
	const value = { state, dispatch };

	return (
		<HomeContext.Provider value={value}>
			{props.children}
		</HomeContext.Provider>
	);
};

export default HomeProvider;
