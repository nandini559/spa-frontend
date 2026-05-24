import {FaBell} from "react-icons/fa";

const Navbar = () => {
  return (<header className="bg-white border-b px-6 py-4 flex items-center justify-between">
    {/* Left */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
    </div>

    {/* Right */}
    <div className="flex items-center gap-5">
      {/* Notification */}
      <button className="relative">
        <FaBell className="text-xl text-gray-600"/>

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          2
        </span>
      </button>

      {/* User */}
      <div className="flex items-center gap-3">
        <img src="https://i.pravatar.cc/100" alt="profile" className="w-10 h-10 rounded-full object-cover"/>

        <div>
          <h2 className="font-semibold text-gray-700">John Doe</h2>

          <p className="text-sm text-gray-500">Admin User</p>
        </div>
      </div>
    </div>
  </header>);
};

export default Navbar;
