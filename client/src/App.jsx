import React from "react";
import {
	createBrowserRouter,
	RouterProviders,
	Outlet,
	Routes,
	Route,
} from "react-router-dom";
import { HomePage, AddPage, FillPage } from "./views";
import AuthProvider from "./state/Auth/auth.provider";

const Root = () => {
	//TODO - migrate to new react-router-dom version
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="add" element={<AddPage />} />
					<Route path="fill" element={<FillPage />} />
				</Routes>
			</AuthProvider>
		</div>
	);
};

const Layout = () => {
	return (
		<>
			<AuthProvider>
				<header>
					<h1>Nav bar go here</h1>
				</header>
				<main>
					<Outlet />
				</main>
				<footer>@ me 2023</footer>
			</AuthProvider>
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "*",
		Component: Layout,
		children: [{ path: "/", Component: HomePage }],
	},
]);

const App = () => {
	return <RouterProviders router={router} />;
};

export default App;
