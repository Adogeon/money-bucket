import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./Router";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
