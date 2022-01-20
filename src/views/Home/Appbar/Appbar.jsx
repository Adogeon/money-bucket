import React from "react";
import { Link } from "react-router-dom";

const Appbar = () => (
  <div className="w-screen flex border-b py-5 px-3 bg-gray-800 text-white justify-end space-x-3 mb-5">
    <Link to="/add" className="text-sm">
      Add a transaction
    </Link>
    <Link to="/fill" className="text-sm">
      Fill buckets
    </Link>
  </div>
);

export default Appbar;
