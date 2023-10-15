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

const Layout = (): JSX.Element => {
  return (
    <>
      <ProvideAuth>
        <AuthContainer>
          <header>
            <h1>Nav bar go here</h1>
            <Appbar />
          </header>
          <main>
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
    if (isCached) {
      loadCache();
    }
  }, [isCached]);
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
const AddTransaction = (): JSX.Element => (
  <div> Page to add a new transaction</div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="bucket" element={<Buckets />}>
        <Route path=":bucketId" element={<Bucket />} />
        <Route path="new" element={<AddBucket />} />
      </Route>
      <Route path="transaction" element={<Transactions />}>
        <Route path=":transactionId" element={<Transaction />} />
        <Route path="new" element={<AddTransaction />} />
      </Route>
      <Route index element={<Home />} />
    </Route>
  )
);

const App = (): JSX.Element => <RouterProvider router={router} />;
export default App;
