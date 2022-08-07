import React from 'react';

const NavBar = () => {
  return (
  <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-green-300 text-gray-300 hover:text-gray-700 focus:text-gray-700 shadow-lg">
    <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
      <div className="container-fluid">
        <a className="text-xl text-green-600 font-semibold" href="/">Navbar</a>
      </div>
      <div className="flex items-center relative">
        <button className="bg-green-500 text-white px-3 py-1 rounded-md ">New Transaction</button>
      </div>
    </div>
  </nav>
)}

export default NavBar;