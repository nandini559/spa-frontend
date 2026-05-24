const Users = () => {
  return (<div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Users Management</h1>

      <button className="bg-[#6C4CF1] text-white px-5 py-2 rounded-lg">
        Add User
      </button>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b"></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>);
};

export default Users;
