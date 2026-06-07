import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  FaDatabase,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";

import { getRecords } from "../../api/recordApi";

import { useNavigate } from "react-router-dom";

import AddEditRecord from "../records/addEditRecords";

const Dashboard = () => {

  const [records, setRecords] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const navigate = useNavigate();

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
        record.status?.toLowerCase() ===
        "active"
    ).length;

    const pending = records.filter(
      (record) =>
        record.status?.toLowerCase() ===
        "pending"
    ).length;

    const closed = records.filter(
      (record) =>
        record.status?.toLowerCase() ===
        "closed"
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

    switch (
      status?.toLowerCase()
    ) {

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

  } else if (
    records.length === 0
  ) {

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

          <td className="py-4 px-4 font-medium text-gray-700 whitespace-nowrap">

            {record.title}

          </td>

          <td className="px-4">

            <span
              className={`
                px-3 py-1 rounded-full
                text-xs sm:text-sm
                font-medium
                whitespace-nowrap
                ${getStatusStyle(
                  record.status
                )}
              `}
            >

              {record.status}

            </span>

          </td>

          <td className="px-4 text-gray-600 whitespace-nowrap">

            {record.access}

          </td>

          <td className="px-4 text-gray-600 whitespace-nowrap">

            {
              new Date(
                record.createdAt
              ).toLocaleDateString()
            }

          </td>

        </tr>
      ));
  }

  return (

    <div className="space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}
        <div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">

            Dashboard

          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">

            Welcome back 👋
            Here’s what’s happening
            today.

          </p>

        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

          <button
            onClick={() =>
             navigate("/records/add")
            }
            className="
              bg-[#6C4CF1]
              hover:bg-[#5a3ee0]
              text-white
              px-5 py-3
              rounded-xl
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              w-full sm:w-auto
            "
          >

            + Add Record

          </button>

        </div>

      </div>

      {/* Form Modal */}
      {
        showForm && (

          <div
            className="
              fixed inset-0 z-50
              bg-black/40
              flex items-center justify-center
              p-4
            "
          >

            <div
              className="
                bg-white
                w-full max-w-2xl
                rounded-3xl
                shadow-2xl
                p-4 sm:p-6
                overflow-y-auto
                max-h-[90vh]
              "
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold text-gray-800">

                  Add Record

                </h2>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="text-red-500 font-medium"
                >

                  Close

                </button>

              </div>

              <AddEditRecord
                fetchRecords={
                  fetchRecords
                }
                closeForm={() =>
                  setShowForm(false)
                }
              />

            </div>

          </div>
        )
      }

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

        {
          stats.map((item) => (

            <div
              key={item.title}
              className="
                bg-white
                rounded-2xl sm:rounded-3xl
                shadow-sm
                border
                p-5 sm:p-6
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-gray-500 text-sm">

                    {item.title}

                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-800">

                    {item.value}

                  </h2>

                </div>

                <div
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14
                    rounded-2xl
                    ${item.color}
                    text-white
                    flex items-center justify-center
                    text-xl sm:text-2xl
                    shadow-lg
                  `}
                >

                  {item.icon}

                </div>

              </div>

            </div>
          ))
        }

      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">

            Recent Records

          </h2>

          <button
            onClick={() =>
              navigate("/records")
            }
            className="
              text-[#6C4CF1]
              font-medium
              hover:underline
              self-start sm:self-auto
            "
          >

            View All

          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl">

          <table className="w-full min-w-[600px]">

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