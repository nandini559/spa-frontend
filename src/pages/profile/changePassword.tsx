import {useState} from "react";
import {FaLock} from "react-icons/fa";
import api from "../../api/axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  userID: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
  const [loading, setLoading] = useState(false);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.newPassword !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  const toastId = toast.loading("Updating password...");

  try {
    setLoading(true);

    const loggedInUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const response = await api.patch(
      `/users/change-password/${loggedInUser.id}`,
      {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }
    );

    console.log(response.data);

    setFormData({
      userID: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    toast.success("Password Updated Successfully", {
      id: toastId,
    });

    navigate("/profile");
  } catch (error: any) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to update password",
      { id: toastId }
    );
  } finally {
    setLoading(false);
  }
};

  return (<div className="max-w-xl mx-auto">
    <div className="bg-white rounded-3xl shadow-lg border p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#6C4CF1] text-white flex items-center justify-center text-2xl shadow-lg">
          <FaLock/>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Change Password
          </h1>

          <p className="text-gray-500 mt-1">Update your password securely</p>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <button type="button" onClick={() => navigate("/profile")} className="px-4 py-2 border border-gray-300 rounded-xl text-blue-500 hover:bg-gray-100 transition">
          ← Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* UserID */}
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-700">
            UserID
          </p>

          <input type="text" name="userID" placeholder="Enter UserID" value={formData.userID} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* Current Password */}
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-700">
            Current Password
          </p>

          <input type="password" name="currentPassword" placeholder="Enter current password" value={formData.currentPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* New Password */}
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-700">
            New Password
          </p>

          <input type="password" name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* Confirm Password */}
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-700">
            Confirm Password
          </p>

          <input type="password" name="confirmPassword" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* Button */}
        <button type="submit" disabled={loading} className="w-full bg-[#6C4CF1] hover:bg-[#5938db] text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1">
          {
            loading
              ? "Updating..."
              : "Update Password"
          }
        </button>
      </form>
    </div>
  </div>);
};

export default ChangePassword;
