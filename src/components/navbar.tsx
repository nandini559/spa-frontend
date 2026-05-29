import {
  useEffect,
  useState
} from "react";

import {
  Menu as MenuIcon,
  Bell,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  setSidebarOpen?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const Navbar = ({
  setSidebarOpen
}: NavbarProps) => {

  const [user, setUser] =
    useState<any>(null);

const navigate = useNavigate();


  const fetchUser = () => {

    try {

      const loggedInUser =
        localStorage.getItem("user");

      if (loggedInUser) {

        setUser(
          JSON.parse(loggedInUser)
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchUser();

    // Listen for localStorage changes
    window.addEventListener(
      "storage",
      fetchUser
    );

    return () => {

      window.removeEventListener(
        "storage",
        fetchUser
      );
    };

  }, []);

  return (

    <header
      className="
        sticky top-0 z-30
        bg-white/90
        backdrop-blur-md
        border-b
        shadow-sm
      "
    >

      <div
        className="
          flex items-center justify-between
          px-4 sm:px-6 lg:px-8
          py-3 sm:py-4
          gap-4
        "
      >

        {/* Left Section */}
<div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile Sidebar Button */}
          <button
            onClick={() =>
              setSidebarOpen?.(true)
            }
            className="
              lg:hidden
              p-2.5
              rounded-xl
              hover:bg-gray-100
              active:scale-95
              transition-all
            "
          >

            <MenuIcon size={22} />

          </button>

          {/* Title */}
          <div className="min-w-0">

            <h1
              className="
                text-lg sm:text-xl lg:text-2xl
                font-bold
                text-gray-800
                truncate
              "
            >

              Dashboard

            </h1>

            <p
              className="
                hidden sm:block
                text-xs text-gray-500 mt-0.5
              "
            >

              Welcome back 👋

            </p>

          </div>

        </div>

        

        {/* Right Section */}
        <div
          className="
            flex items-center
            gap-2 sm:gap-4
            shrink-0
          "
        >

         
         {/* User Card */}
<button
  onClick={() => navigate("/profile")}
  className="
    flex items-center gap-3
    bg-gray-50
    border
    rounded-2xl
    px-2 sm:px-3
    py-2
    hover:shadow-md
    hover:bg-gray-100
    transition-all duration-300
    cursor-pointer
  "
>

  {/* Avatar */}
  <div
    className="
      w-10 h-10
      rounded-full
      bg-gradient-to-r
      from-[#6C4CF1]
      to-[#8B5CF6]
      text-white
      flex items-center justify-center
      font-semibold
      shadow-md
      shrink-0
    "
  >

    {
      user?.userId
        ? user.userId
            .charAt(0)
            .toUpperCase()
        : "U"
    }

  </div>

  {/* User Info */}
  <div
    className="
      hidden sm:block
      text-left
      min-w-0
    "
  >

    <h2
      className="
        font-semibold
        text-gray-700
        text-sm md:text-base
        truncate
        max-w-[120px]
        lg:max-w-[180px]
      "
    >

      {
        user?.userId ||
        "Loading..."
      }

    </h2>

    <p
      className="
        text-xs
        text-gray-500
        capitalize
      "
    >

      {
        user?.role ||
        "User"
      }

    </p>

  </div>

</button>

        </div>

      </div>

    </header>
  );
};

export default Navbar;