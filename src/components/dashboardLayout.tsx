import {useState} from "react";

import {Outlet} from "react-router-dom";

import Sidebar from "./sidebar";
import Navbar from "./navbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (<div className="min-h-screen bg-gray-100">
    {/* Layout Wrapper */}
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>{" "}
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen}/> {/* Page Content */}
        <main className="
              flex-1
              p-4 sm:p-6 lg:p-8
              overflow-x-hidden
            ">
          <Outlet/>
        </main>
      </div>
    </div>
  </div>);
};

export default DashboardLayout;
