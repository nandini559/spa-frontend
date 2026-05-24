const AddEditUser = () => {
  return (<div className="bg-white rounded-2xl shadow-sm border p-8 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">Add New User</h1>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Full Name" className="border rounded-lg px-4 py-3"/>

      <input type="email" placeholder="Email" className="border rounded-lg px-4 py-3"/>

      <input type="password" placeholder="Password" className="border rounded-lg px-4 py-3"/>

      <select className="border rounded-lg px-4 py-3">
        <option>User</option>
        <option>Admin</option>
      </select>

      <button className="col-span-full bg-[#6C4CF1] text-white py-3 rounded-lg">
        Save User
      </button>
    </form>
  </div>);
};

export default AddEditUser;
