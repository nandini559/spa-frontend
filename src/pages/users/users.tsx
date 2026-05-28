import {useEffect, useState} from "react";
import {getUsers} from "../../api/userApi";
import AddEditUser from "./addEditUsers";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (<div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Users Management</h1>

      <button onClick={() => setShowForm(true)} className="bg-[#6C4CF1] text-white px-5 py-2 rounded-lg">
        Add User
      </button>
    </div>

    {/* Form */}
    {
      showForm && (<div>
        <div className="flex justify-end mb-3">
          <button onClick={() => setShowForm(false)} className="text-red-500 font-medium">
            Close
          </button>
        </div>

        <AddEditUser fetchUsers={fetchUsers} closeForm={() => setShowForm(false)}/>
      </div>)
    }

    {/* Table */}
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Username</th>
              <th>Password</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              loading
                ? (<tr>
                  <td className="py-4">Loading...</td>
                </tr>)
                : users.length === 0
                  ? (<tr>
                    <td className="py-4">No Users Found</td>
                  </tr>)
                  : (users.map((user) => (<tr key={user.id} className="border-b">
                    <td className="py-4">{user.userId}</td>

                    <td>********</td>

                    <td>{user.role}</td>

                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button className="text-blue-500">Edit</button>
                    </td>
                  </tr>)))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>);
};

export default Users;
