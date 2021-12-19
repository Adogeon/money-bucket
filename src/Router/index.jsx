import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, AccountPage } from "../views";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
