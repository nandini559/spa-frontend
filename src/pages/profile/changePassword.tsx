import {FaLock} from "react-icons/fa";

const ChangePassword = () => {
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

      {/* Form */}
      <form className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Current Password
          </label>

          <input type="password" placeholder="Enter current password" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            New Password
          </label>

          <input type="password" placeholder="Enter new password" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <input type="password" placeholder="Confirm new password" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
        </div>

        {/* Password Rules */}
        <div className="bg-gray-50 border rounded-2xl p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Password Requirements:</p>

          <ul className="space-y-1 list-disc list-inside">
            <li>Minimum 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>

        {/* Button */}
        <button className="w-full bg-[#6C4CF1] hover:bg-[#5938db] text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1">
          Update Password
        </button>
      </form>
    </div>
  </div>);
};

export default ChangePassword;
