import {NavLink, useNavigate} from "react-router-dom";
import {FaHome, FaUsers, FaFileAlt, FaUser, FaLock} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome/>
    }, {
      name: "Users",
      path: "/users",
      icon: <FaUsers/>
    }, {
      name: "Records",
      path: "/records",
      icon: <FaFileAlt/>
    }, {
      name: "Profile",
      path: "/profile",
      icon: <FaUser/>
    }, {
      name: "Change Password",
      path: "/change-password",
      icon: <FaLock/>
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/");
  };

  return (<aside className="w-72 bg-[#111827] text-white min-h-screen p-5 flex flex-col">
    {/* Logo */}
    <div className="mb-10">
      <h1 className="text-2xl font-bold text-center">SPA Application</h1>

      <p className="text-sm text-gray-400 text-center mt-1">
        Secure. Simple. Smart.
      </p>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-2 flex-1">
      {
        navItems.map((item) => (<NavLink key={item.name} to={item.path} className={(
            {isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            isActive
            ? "bg-[#6C4CF1] text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"}`
}>
          <span className="text-lg">{item.icon}</span>

          <span className="font-medium">{item.name}</span>
        </NavLink>))
      }
    </nav>

    {/* Logout */}
    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500 hover:text-white transition-all">
      <span>Logout</span>
    </button>
  </aside>);
};

export default Sidebar;
