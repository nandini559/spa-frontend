import { useEffect, useState } from "react";

import { FaBell } from "react-icons/fa";
import { getUsers } from "../api/userApi";


const Navbar = () => {

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {

      const users = await getUsers();

      // temporary first user
      setUser(users[0]);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (

    <header className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">

      {/* Left */}
      <div>

        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative">

          <FaBell className="text-xl text-gray-600" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

            2

          </span>

        </button>

        {/* User */}
        <div className="flex items-center gap-3">

         
          {/* User Info */}
          <div className="hidden sm:block">

            <h2 className="font-semibold text-gray-700">

              {
                user?.userId ||
                "Loading..."
              }

            </h2>

            <p className="text-sm text-gray-500">

              {
                user?.role ||
                "User"
              }

            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;