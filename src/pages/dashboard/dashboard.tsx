import { useEffect, useMemo, useState } from "react";

import {
  FaDatabase,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";

import { getRecords } from "../../api/recordApi";

const Dashboard = () => {

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {

    try {

      const data = await getRecords();

      setRecords(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Stats
  const stats = useMemo(() => {

    const active = records.filter(
      (record) =>
        record.status?.toLowerCase() === "active"
    ).length;

    const pending = records.filter(
      (record) =>
        record.status?.toLowerCase() === "pending"
    ).length;

    const closed = records.filter(
      (record) =>
        record.status?.toLowerCase() === "closed"
    ).length;

    return [
      {
        title: "Total Records",
        value: records.length,
        icon: <FaDatabase />,
        color: "bg-blue-500"
      },
      {
        title: "Active",
        value: active,
        icon: <FaCheckCircle />,
        color: "bg-green-500"
      },
      {
        title: "Pending",
        value: pending,
        icon: <FaClock />,
        color: "bg-yellow-500"
      },
      {
        title: "Closed",
        value: closed,
        icon: <FaTimesCircle />,
        color: "bg-red-500"
      }
    ];

  }, [records]);

  const getStatusStyle = (
    status: string
  ) => {

    switch (status?.toLowerCase()) {

      case "active":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "closed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Table Content
  let tableContent: React.ReactNode;

  if (loading) {

    tableContent = (

      <tr>

        <td
          colSpan={4}
          className="py-6 text-center"
        >

          Loading...

        </td>

      </tr>
    );

  } else if (records.length === 0) {

    tableContent = (

      <tr>

        <td
          colSpan={4}
          className="py-6 text-center"
        >

          No Records Found

        </td>

      </tr>
    );

  } else {

    tableContent = records
      .slice(0, 5)
      .map((record) => (

        <tr
          key={record.id}
          className="border-b hover:bg-gray-50 transition-all"
        >

          <td className="py-4 px-4 font-medium text-gray-700">

            {record.title}

          </td>

          <td className="px-4">

            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(record.status)}`}>

              {record.status}

            </span>

          </td>

          <td className="px-4 text-gray-600">

            {record.access}

          </td>

          <td className="px-4 text-gray-600">

            {
              new Date(record.createdAt)
                .toLocaleDateString()
            }

          </td>

        </tr>
      ));
  }

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back 👋 Here’s what’s happening today.
          </p>

        </div>

        <button className="bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">

          + Add Record

        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {
          stats.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-3xl shadow-sm border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-gray-800">
                    {item.value}
                  </h2>

                </div>

                <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center text-2xl shadow-lg`}>

                  {item.icon}

                </div>

              </div>

            </div>
          ))
        }

      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-3xl shadow-sm border p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Records
          </h2>

          <button className="text-[#6C4CF1] font-medium hover:underline">

            View All

          </button>

        </div>

        <div className="overflow-x-auto rounded-2xl">

          <table className="w-full overflow-hidden">

            <thead className="bg-gray-100">

              <tr className="text-left text-gray-600">

                <th className="py-4 px-4 font-semibold">
                  Title
                </th>

                <th className="px-4 font-semibold">
                  Status
                </th>

                <th className="px-4 font-semibold">
                  Access
                </th>

                <th className="px-4 font-semibold">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {tableContent}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;