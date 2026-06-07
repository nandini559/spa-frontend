import {
  useEffect,
  useState
} from "react";

import { getRecords } from "../../api/recordApi";

import AddEditRecord from "./addEditRecords";
import { Navigate, useNavigate } from "react-router-dom";

const Records = () => {

  const [records, setRecords] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [selectedRecord, setSelectedRecord] =
    useState<any>(null);

  const navigate = useNavigate();


  const fetchRecords = async () => {

    try {

      const data =
        await getRecords();

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

  let tableContent;

  if (loading) {

    tableContent = (

      <tr>

        <td
          colSpan={6}
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
          colSpan={6}
          className="py-6 text-center"
        >

          No Records Found

        </td>

      </tr>
    );

  } else {

    tableContent = records.map(
      (record) => (

        <tr
          key={record.id}
          className="
            border-b
            hover:bg-gray-50
            transition-all
          "
        >

          <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-700">

            {record.title}

          </td>

          <td className="px-4 whitespace-nowrap text-gray-600">

            {
              record.user
                ?.userId
            }

          </td>

          <td className="px-4 whitespace-nowrap">

            <span
              className={`
                px-3 py-1
                rounded-full
                text-xs sm:text-sm
                font-medium
                ${
                  record.status ===
                  "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : record.status ===
                      "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >

              {record.status}

            </span>

          </td>

          <td className="px-4 whitespace-nowrap text-gray-600">

            {record.access}

          </td>

          <td className="px-4 whitespace-nowrap text-gray-600">

            {
              new Date(
                record.createdAt
              ).toLocaleDateString()
            }

          </td>

          <td className="px-4 whitespace-nowrap">

            <button
             onClick={() =>  navigate(`/records/edit/${record.id}`)} 
              className="
                text-blue-500
                hover:text-blue-700
                font-medium
                transition
              "
            >
              Edit
            </button>
          </td>
        </tr>
      )
    );
  }

  return (

    <div className="space-y-6">

      {/* Header */}
      <div
        className="
          flex flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div>

          <h1
            className="
              text-2xl sm:text-3xl
              font-bold
              text-gray-800
            "
          >

            Records Management

          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">

            Manage all records
            from one place.

          </p>

        </div>

        <button
  onClick={() => navigate("/records/add")}
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
                w-full max-w-3xl
                rounded-3xl
                shadow-2xl
                p-4 sm:p-6
                overflow-y-auto
                max-h-[90vh]
              "
            >

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">

                  {
                    selectedRecord
                      ? "Edit Record"
                      : "Add Record"
                  }

                </h2>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="
                    text-red-500
                    hover:text-red-700
                    font-medium
                  "
                >

                  Close

                </button>

              </div>


            </div>

          </div>
        )
      }

      {/* Table */}
      <div
        className="
          bg-white
          rounded-2xl sm:rounded-3xl
          shadow-sm
          border
          p-4 sm:p-6
        "
      >

        <div className="overflow-x-auto rounded-2xl">

          <table className="w-full min-w-[750px]">

            <thead className="bg-gray-100">

              <tr className="text-left text-gray-600">

                <th className="py-4 px-4 font-semibold">

                  Title

                </th>

                <th className="px-4 font-semibold">

                  User

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

                <th className="px-4 font-semibold">

                  Action

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

export default Records;