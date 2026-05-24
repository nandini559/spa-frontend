import {FaDatabase, FaCheckCircle, FaClock, FaTimesCircle} from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Records",
      value: 120,
      icon: <FaDatabase/>,
      color: "bg-blue-500"
    }, {
      title: "Active",
      value: 80,
      icon: <FaCheckCircle/>,
      color: "bg-green-500"
    }, {
      title: "Pending",
      value: 25,
      icon: <FaClock/>,
      color: "bg-yellow-500"
    }, {
      title: "Closed",
      value: 15,
      icon: <FaTimesCircle/>,
      color: "bg-red-500"
    }
  ];

  return (<div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋 Here’s what’s happening today.
        </p>
      </div>

      <button className="bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        + Add Record
      </button>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {
        stats.map((item) => (<div key={item.title} className="bg-white rounded-3xl shadow-sm border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>

              <h2 className="text-4xl font-bold mt-3 text-gray-800">
                {item.value}
              </h2>
            </div>

            <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center text-2xl shadow-lg`}>
              {item.icon}
            </div>
          </div>
        </div>))
      }
    </div>

    {/* Recent Records */}
    <div className="bg-white rounded-3xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Records</h2>

        <button className="text-[#6C4CF1] font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600">
              <th className="py-4 px-4 font-semibold">Title</th>

              <th className="px-4 font-semibold">Status</th>

              <th className="px-4 font-semibold">Access</th>

              <th className="px-4 font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b hover:bg-gray-50 transition-all">
              <td className="py-4 px-4 font-medium text-gray-700">
                Record One
              </td>

              <td className="px-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </td>

              <td className="px-4 text-gray-600">Full Access</td>

              <td className="px-4 text-gray-600">12 May 2026</td>
            </tr>

            <tr className="border-b hover:bg-gray-50 transition-all">
              <td className="py-4 px-4 font-medium text-gray-700">
                Record Two
              </td>

              <td className="px-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  Pending
                </span>
              </td>

              <td className="px-4 text-gray-600">Limited Access</td>

              <td className="px-4 text-gray-600">10 May 2026</td>
            </tr>

            <tr className="hover:bg-gray-50 transition-all">
              <td className="py-4 px-4 font-medium text-gray-700">
                Record Three
              </td>

              <td className="px-4">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Closed
                </span>
              </td>

              <td className="px-4 text-gray-600">Read Only</td>

              <td className="px-4 text-gray-600">08 May 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>);
};

export default Dashboard;
