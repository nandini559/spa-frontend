import { useState } from "react";

import api from "../../api/axios";

interface Props {
  fetchRecords: () => void;
  closeForm: () => void;
  selectedRecord?: any;
}

const AddEditRecord = ({
  fetchRecords,
  closeForm,
  selectedRecord
}: Props) => {

  const [formData, setFormData] = useState({
  title:
    selectedRecord?.title || "",

  status:
    selectedRecord?.status || "ACTIVE",

  access:
    selectedRecord?.access || "FULL_ACCESS",

  userId:
    selectedRecord?.userId || ""
});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

     const response = selectedRecord

  ? await api.patch(
      `/records/${selectedRecord.id}`,
      formData
    )

  : await api.post(
      "/records",
      formData
    );

      console.log(response.data);

      alert("Record Created Successfully");

      fetchRecords();

      closeForm();

      setFormData({
        title: "",
        status: "ACTIVE",
        access: "FULL_ACCESS",
        userId: ""
      });

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
       {
  selectedRecord
    ? "Edit Record"
    : "Add New Record"
}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
          required
        />

        {/* User ID */}
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
          required
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
        >

          <option value="ACTIVE">
            Active
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="CLOSED">
            Closed
          </option>

        </select>

        {/* Access */}
        <select
          name="access"
          value={formData.access}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3"
        >

          <option value="FULL_ACCESS">
            Full Access
          </option>

          <option value="LIMITED_ACCESS">
            Limited Access
          </option>

          <option value="READ_ONLY">
            Read Only
          </option>

        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-[#6C4CF1] text-white py-3 rounded-lg"
        >

          {
            loading
              ? "Saving..."
              : "Save Record"
          }

        </button>

      </form>

    </div>
  );
};

export default AddEditRecord;