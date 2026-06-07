import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../../api/axios";
import toast from "react-hot-toast";

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

  const toastId = toast.loading(
    id ? "Updating user..." : "Creating user..."
  );

  try {
    setLoading(true);

    if (id) {
      await api.patch(
        `/users/${id}`,
        formData
      );

      toast.success(
        "User Updated Successfully",
        { id: toastId }
      );
    } else {
      await api.post(
        "/users",
        formData
      );

      toast.success(
        "User Created Successfully",
        { id: toastId }
      );
    }

    navigate("/users");
  } catch (error: any) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
      "Something went wrong",
      { id: toastId }
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

        <div className="mb-6 flex justify-end">
        <button type="button" onClick={() => navigate("/users")} className="px-4 py-2 border border-gray-300 rounded-xl text-blue-500 hover:bg-gray-100 transition">
          ← Back
        </button>
      </div>

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