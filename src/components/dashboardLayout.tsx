import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const DashboardLayout = () => {
  return (<div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar/> {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      <Navbar/> {/* Page Content */}
      <main className="p-6 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  </div>);
};

export default DashboardLayout;
