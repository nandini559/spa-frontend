import {useEffect, useState} from "react";

import {getUsers} from "../../api/userApi";

import AddEditUser from "./addEditUsers";

import {FaUsers, FaUserShield, FaCalendarAlt, FaEdit} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);

      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  let tableContent;

  if (loading) {
    tableContent = (<tr>
      <td colSpan={6} className="py-6 text-center">
        Loading...
      </td>
    </tr>);
  } else if (users.length === 0) {
    tableContent = (<tr>
      <td colSpan={6} className="py-6 text-center">
        No Users Found
      </td>
    </tr>);
  } else {
    tableContent = currentUsers.map((user) => (<tr key={user.id} className="
        border-b
        hover:bg-gray-50
        transition-all
      ">
      <td className="py-4 px-4 font-medium text-gray-700 whitespace-nowrap">
        {user.userId}
      </td>

      <td className="py-4 px-4 font-medium text-gray-700 whitespace-nowrap">
        {user.username}
      </td>

      <td className="px-4 text-gray-500 whitespace-nowrap">********</td>

      <td className="px-4 whitespace-nowrap">
        <span className={`
            px-3 py-1
            rounded-full
            text-xs sm:text-sm
            font-medium
            ${
          user.role === "ADMIN"
            ? "bg-purple-100 text-purple-700"
            : "bg-blue-100 text-blue-700"}
          `}>
          {user.role}
        </span>
      </td>

      <td className="px-4 text-gray-600 whitespace-nowrap">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="px-4 whitespace-nowrap">
        <button onClick={() => navigate(`/users/edit/${user.id}`)} className="
            flex items-center gap-2
            text-blue-500
            hover:text-blue-700
            font-medium
            transition
          ">
          <FaEdit/>
          Edit
        </button>
      </td>
    </tr>));
  }

  return (<div className="space-y-6">
    {/* Header */}
    <div className="
          flex flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        ">
      <div>
        <h1 className="
              text-2xl sm:text-3xl
              font-bold
              text-gray-800
            ">
          Users Management
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage all users and permissions.
        </p>
      </div>

      <button onClick={() => {
          navigate("/users/add");
        }} className="
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
  ">
        + Add User
      </button>
    </div>

    {/* Form Modal */}
    {
      showForm && (<div className="
              fixed inset-0 z-50
              bg-black/40
              flex items-center justify-center
              p-4
            ">
        <div className="
                bg-white
                w-full max-w-2xl
                rounded-3xl
                shadow-2xl
                p-4 sm:p-6
                overflow-y-auto
                max-h-[90vh]
              ">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Add User
            </h2>

            <button onClick={() => setShowForm(false)} className="
                    text-red-500
                    hover:text-red-700
                    font-medium
                  ">
              Close
            </button>
          </div>
          <AddEditUser/>
        </div>
      </div>)
    }

    {/* Stats Cards */}
    <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 sm:gap-6
        ">
      {/* Total Users */}
      <div className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            p-6
            hover:shadow-lg
            transition-all
          ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>

            <h2 className="text-4xl font-bold mt-3 text-gray-800">
              {Users.length}
            </h2>
          </div>

          <div className="
                w-14 h-14
                rounded-2xl
                bg-blue-500
                text-white
                flex items-center justify-center
                text-2xl
                shadow-lg
              ">
            <FaUsers/>
          </div>
        </div>
      </div>

      {/* Admin Count */}
      <div className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            p-6
            hover:shadow-lg
            transition-all
          ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Admin Users</p>

            <h2 className="text-4xl font-bold mt-3 text-gray-800">
              {users.filter((user) => user.role === "ADMIN").length}
            </h2>
          </div>

          <div className="
                w-14 h-14
                rounded-2xl
                bg-purple-500
                text-white
                flex items-center justify-center
                text-2xl
                shadow-lg
              ">
            <FaUserShield/>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            p-6
            hover:shadow-lg
            transition-all
          ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Users</p>

            <h2 className="text-4xl font-bold mt-3 text-gray-800">
              {users.length}
            </h2>
          </div>

          <div className="
                w-14 h-14
                rounded-2xl
                bg-green-500
                text-white
                flex items-center justify-center
                text-2xl
                shadow-lg
              ">
            <FaCalendarAlt/>
          </div>
        </div>
      </div>
    </div>

    {/* Users Table */}
    <div className="
          bg-white
          rounded-2xl sm:rounded-3xl
          shadow-sm
          border
          p-4 sm:p-6
        ">
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600">
              <th className="py-4 px-4 font-semibold">UserID</th>

              <th className="py-4 px-4 font-semibold">Username</th>

              <th className="px-4 font-semibold">Password</th>

              <th className="px-4 font-semibold">Role</th>

              <th className="px-4 font-semibold">Created At</th>

              <th className="px-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>{tableContent}</tbody>
        </table>
      </div>
    </div>
  </div>);
};

export default Users;
