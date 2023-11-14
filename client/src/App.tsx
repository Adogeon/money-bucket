import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { ProvideAuth, useAuth } from "./context/AuthContext";
import Appbar from "./components/Appbar/Appbar";

import Home from "./container/Home";
import AddPage from "./container/Transaction/addNew";
import BucketPage from "./container/Bucket";
import TransactionPage from "./container/Transaction";
import TransactionEditPage from "./container/Transaction/edit";

const Layout = (): JSX.Element => {
  return (
    <>
      <ProvideAuth>
        <AuthContainer>
          <header>
            <h1>Nav bar go here</h1>
            <Appbar />
          </header>
          <main className="bg-slate-300">
            <Outlet />
          </main>
          <footer>@ me 2023</footer>
        </AuthContainer>
      </ProvideAuth>
    </>
  );
};

const AuthContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  const { isCached, loadCache } = useAuth();
  useEffect(() => {
    if (isCached()) {
      loadCache();
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

const Buckets = (): JSX.Element => <div> List of bucket summary</div>;
const Bucket = (): JSX.Element => (
  <div>Bucket Detail with transactions within the list</div>
);
const AddBucket = (): JSX.Element => <div>New page to add a new bucket</div>;

const Transactions = (): JSX.Element => (
  <div> List of Transactions with Month selector(Search ?)</div>
);
const Transaction = (): JSX.Element => <div> Detail of a Transaction</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="bucket/new" element={<AddBucket />} />
      <Route path="bucket/:bucketId" element={<BucketPage />} />
      <Route path="transaction/new" element={<AddPage />} />
      <Route path="transaction/:transactionId" element={<TransactionPage />} />
      <Route
        path="transaction/edit/:transactionId"
        element={<TransactionEditPage />}
      />
      <Route index element={<Home />} />
    </Route>
  )
);

const App = (): JSX.Element => <RouterProvider router={router} />;
export default App;
