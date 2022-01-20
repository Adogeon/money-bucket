import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, AccountPage, AddPage, FillPage } from "../views";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add" element={<AddPage />} />
        <Route path="fill-bucket" element={<FillPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
