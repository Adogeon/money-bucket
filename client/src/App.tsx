import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Outlet,
	Route,
} from "react-router-dom";
import { HomePage, AddPage, FillPage } from "./views";
import AuthProvider from "./state/Auth/auth.provider";
import Appbar from "./components/Appbar/Appbar";
import TestPage from "./views/test";

const Layout = (): JSX.Element => {
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
			<Route path="test" element={<TestPage />} />
		</Route>
	)
);

const App = ():JSX.Element => <RouterProvider router={router} />;
;

export default App;
