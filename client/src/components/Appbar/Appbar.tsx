import {Link} from "@tanstack/react-router";

const Appbar = (): JSX.Element => (
  <div className="w-screen flex border-b py-5 px-6 bg-primary text-white justify-between space-x-3 mb-5">
    <div>
      <Link to="/">
        <div className="flex">
          <img
            src="/asset/demo-logo.png"
            alt="demo-logo"
            className="h-auto w-6"
          />
          <p className="ml-2 text-2xl">Money-Bucket</p>
        </div>
      </Link>
    </div>
    <div className="flex space-x-3">
      <div>
        <span className="text-sm align-middle">Add transaction</span>
      </div>
      <div>
        <span className="text-sm align-middle">Fill Bucket</span>
      </div>
      <div className="hover:cursor-pointer h-full">
        <span className="text-sm align-middle">Log Out</span>
      </div>
    </div>
  </div>
);

export default Appbar;
