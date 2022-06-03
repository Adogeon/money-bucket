import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, AccountPage, AddPage, FillPage } from "./views";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="add" element={<AddPage />} />
          <Route path="fill" element={<FillPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
