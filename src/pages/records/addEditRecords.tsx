const AddEditRecord = () => {
  return (<div className="bg-white rounded-2xl shadow-sm border p-8 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">Add New Record</h1>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Title" className="border rounded-lg px-4 py-3"/>

      <select className="border rounded-lg px-4 py-3">
        <option>Status</option>
        <option>Active</option>
        <option>Pending</option>
        <option>Closed</option>
      </select>

      <select className="border rounded-lg px-4 py-3">
        <option>Access Level</option>
        <option>Full Access</option>
        <option>Limited Access</option>
        <option>Read Only</option>
      </select>

      <button className="col-span-full bg-[#6C4CF1] text-white py-3 rounded-lg">
        Save Record
      </button>
    </form>
  </div>);
};

export default AddEditRecord;
