import { useState } from "react";

import api from "../../api/axios";

const AddEditUser = () => {

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    role: "USER"
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

      const response = await api.post(
        "/users",
        formData
      );

      console.log(response.data);

      alert("User Created Successfully");

      setFormData({
        userId: "",
        password: "",
        role: "USER"
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
        Add New User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* User ID */}
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C4CF1]"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C4CF1]"
          required
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C4CF1]"
        >
          <option value="USER">
            User
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white py-3 rounded-lg transition-all duration-300"
        >

          {
            loading
              ? "Saving..."
              : "Save User"
          }

        </button>

      </form>

    </div>
  );
};

export default AddEditUser;