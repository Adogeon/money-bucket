import React, { useState } from "react";
import Router from "./router";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
