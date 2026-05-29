import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";

type SidebarProps = {
  sidebarOpen?: boolean;

  setSidebarOpen?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen
}: SidebarProps) => {

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />
    },
    {
      name: "Records",
      path: "/records",
      icon: <FaFileAlt />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />
    },
    {
      name: "Change Password",
      path: "/change-password",
      icon: <FaLock />
    }
  ];

  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (

    <>

      {/* Overlay */}
      {
        sidebarOpen && (

          <div
            onClick={() =>
              setSidebarOpen?.(false)
            }
            className="
              fixed inset-0
              bg-black/40
              backdrop-blur-sm
              z-40
              lg:hidden
            "
          />
        )
      }

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
h-screen lg:sticky lg:top-0          w-[280px] sm:w-72
          bg-[#111827]
          text-white
          flex flex-col
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
lg:w-72
lg:flex
        `}
      >

        {/* Top Section */}
        <div
          className="
            px-5 py-6
            border-b border-gray-800
            flex items-start justify-between
          "
        >

          {/* Logo */}
          <div>

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-[#6C4CF1]
                flex items-center justify-center
                text-2xl
                shadow-lg
                mb-4
              "
            >

              🚀

            </div>

            <h1
              className="
                text-xl sm:text-2xl
                font-bold
                tracking-wide
              "
            >

              SPA Application

            </h1>

            <p
              className="
                text-xs sm:text-sm
                text-gray-400
                mt-1
              "
            >

              Secure. Simple. Smart.

            </p>

          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() =>
              setSidebarOpen?.(false)
            }
            className="
              lg:hidden
              p-2
              rounded-xl
              hover:bg-gray-800
              transition
            "
          >

            <FaTimes size={18} />

          </button>

        </div>

        {/* Navigation */}
        <nav
          className="
            flex-1
            overflow-y-auto
            px-4 py-5
            space-y-2
          "
        >

          {
            navItems.map(
              (item) => (

                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen?.(
                      false
                    )
                  }
                  className={({
                    isActive
                  }) =>
                    `
                      group
                      flex items-center gap-4
                      px-4 py-3.5
                      rounded-2xl
                      transition-all duration-300
                      text-sm sm:text-base
                      font-medium
                      ${
                        isActive
                          ? `
                            bg-[#6C4CF1]
                            text-white
                            shadow-lg
                            shadow-purple-500/20
                          `
                          : `
                            text-gray-300
                            hover:bg-gray-800
                            hover:text-white
                          `
                      }
                    `
                  }
                >

                  {/* Icon */}
                  <span
                    className="
                      text-lg
                      flex items-center justify-center
                    "
                  >

                    {item.icon}

                  </span>

                  {/* Text */}
                  <span>

                    {item.name}

                  </span>

                </NavLink>
              )
            )
          }

        </nav>

        {/* Bottom Section */}
        <div
          className="
            p-4
            border-t border-gray-800
            bg-[#0f172a]
          "
        >

          {/* User Card */}
          <button
  onClick={() => navigate("/profile")}
  className="
    w-full
    flex items-center gap-3
    mb-4
    p-3
    rounded-2xl
    bg-gray-800/70
    hover:bg-gray-800
    transition-all duration-300
    cursor-pointer
    text-left
  "
>

  {/* Avatar */}
  <div
    className="
      w-11 h-11
      rounded-full
      bg-[#6C4CF1]
      flex items-center justify-center
      font-bold
      text-lg
      shrink-0
    "
  >

    U

  </div>

  {/* User Info */}
  <div className="min-w-0">

    <h3
      className="
        text-sm font-semibold
        truncate
      "
    >

      Welcome Back

    </h3>

    <p
      className="
        text-xs text-gray-400
      "
    >

      Logged In User

    </p>

  </div>

</button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center justify-center gap-3
              px-4 py-3
              rounded-2xl
              bg-red-500/10
              text-red-400
              hover:bg-red-500
              hover:text-white
              transition-all duration-300
              font-medium
            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>
  );
};

export default Sidebar;