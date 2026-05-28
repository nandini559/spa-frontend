import { useEffect, useState } from "react";

import { getRecords } from "../../api/recordApi";
import AddEditRecord from "./addEditRecords";


const Records = () => {

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
const [selectedRecord, setSelectedRecord] =
  useState<any>(null);


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

  let tableContent;

  if (loading) {

    tableContent = (
      <tr>
        <td className="py-4">
          Loading...
        </td>
      </tr>
    );

  } else if (records.length === 0) {

    tableContent = (
      <tr>
        <td className="py-4">
          No Records Found
        </td>
      </tr>
    );

  } else {

    tableContent = records.map((record) => (

      <tr
        key={record.id}
        className="border-b"
      >

        <td className="py-4">
          {record.title}
        </td>

        <td>
          {record.user?.userId}
        </td>

        <td>
          {record.status}
        </td>

        <td>
          {record.access}
        </td>

        <td>
          {
            new Date(record.createdAt)
              .toLocaleDateString()
          }
        </td>

        <td>

         <button
  onClick={() => {

    setSelectedRecord(record);

    setShowForm(true);

  }}
  className="text-blue-500"
>
  Edit
</button>

        </td>

      </tr>
    ));
  }

  return (

    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Records Management
        </h1>

        <button
         onClick={() => {

  setSelectedRecord(null);

  setShowForm(true);

}}
          className="bg-[#6C4CF1] text-white px-5 py-2 rounded-lg"
        >
          Add Record
        </button>

      </div>

      {/* Form */}
      {
        showForm && (

          <div>

            <div className="flex justify-end mb-3">

              <button
                onClick={() => setShowForm(false)}
                className="text-red-500 font-medium"
              >
                Close
              </button>

            </div>

           <AddEditRecord
  fetchRecords={fetchRecords}
  closeForm={() => setShowForm(false)}
  selectedRecord={selectedRecord}
/>

          </div>
        )
      }

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Title</th>
              <th>User</th>
              <th>Status</th>
              <th>Access</th>
              <th>Date</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>
            {tableContent}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Records;