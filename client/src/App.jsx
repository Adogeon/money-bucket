import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Outlet,
	Routes,
	Route,
} from "react-router-dom";
import { HomePage, AddPage, FillPage } from "./views";
import AuthProvider from "./state/Auth/auth.provider";
import { loginUser } from "./state/Auth/auth.action";
import Appbar from "./components/Appbar/Appbar";

const Layout = () => {
	return (
		<>
			<AuthProvider>
				<header>
					<h1>Nav bar go here</h1>
					<Appbar />
				</header>
				<main>
					<Outlet />
				</main>
				<footer>@ me 2023</footer>
			</AuthProvider>
		</>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route path="/" element={<HomePage />} />
			<Route path="add" element={<AddPage />} />
			<Route path="fill" element={<FillPage />} />
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
