import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../../api/axios";

const AddEditUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    password: "",
    role: "USER"
  });

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await api.get(
          `/users/${id}`
        );

        const user = response.data;

        setFormData({
          userId: user.userId || "",
          username: user.username || "",
          password: "",
          role: user.role || "USER"
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

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

      if (id) {
        await api.patch(
          `/users/${id}`,
          formData
        );

        alert(
          "User Updated Successfully"
        );
      } else {
        await api.post(
          "/users",
          formData
        );

        alert(
          "User Created Successfully"
        );
      }

      navigate("/users");
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8">

        <h1 className="text-3xl font-bold mb-6">
          {id
            ? "Edit User"
            : "Add New User"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="email"
            name="userId"
            placeholder="Email ID"
            value={formData.userId}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C4CF1]"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C4CF1]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder={
              id
                ? "New Password (optional)"
                : "Password"
            }
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C4CF1]"
            required={!id}
          />

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

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white py-3 rounded-lg transition-all duration-300"
          >
            {loading
              ? id
                ? "Updating..."
                : "Saving..."
              : id
              ? "Update User"
              : "Save User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditUser;