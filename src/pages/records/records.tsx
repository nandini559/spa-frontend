const Records = () => {
  return (<div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Records Management</h1>

      <button className="bg-[#6C4CF1] text-white px-5 py-2 rounded-lg">
        Add Record
      </button>
    </div>

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
          <tr className="border-b">
            <td className="py-4">Record One</td>
            <td>John</td>
            <td>Active</td>
            <td>Full Access</td>
            <td>12 May 2026</td>
            <td>Edit</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);
};

export default Records;
