import { useState } from "react";

import { FaLock } from "react-icons/fa";

import api from "../../api/axios";

const ChangePassword = () => {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      return alert(
        "Passwords do not match"
      );
    }

    try {

      setLoading(true);

      const loggedInUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const response = await api.patch(
        `/users/change-password/${loggedInUser.id}`,
        {
          currentPassword:
            formData.currentPassword,

          newPassword:
            formData.newPassword
        }
      );

      console.log(response.data);

      alert(
        "Password Updated Successfully"
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
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

    <div className="max-w-xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg border p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-14 h-14 rounded-2xl bg-[#6C4CF1] text-white flex items-center justify-center text-2xl shadow-lg">

            <FaLock />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Change Password
            </h1>

            <p className="text-gray-500 mt-1">
              Update your password securely
            </p>

          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Current Password */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"
              required
            />

          </div>

          {/* New Password */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"
              required
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C4CF1] hover:bg-[#5938db] text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1"
          >

            {
              loading
                ? "Updating..."
                : "Update Password"
            }

          </button>

        </form>

      </div>

    </div>
  );
};

export default ChangePassword;