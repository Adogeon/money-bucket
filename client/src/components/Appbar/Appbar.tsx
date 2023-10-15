import { Link } from "react-router-dom";

const Appbar = ():JSX.Element => (
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
