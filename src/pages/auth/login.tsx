import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
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

 const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  const toastId = toast.loading(
    "Logging in..."
  );

  try {
    setLoading(true);

    const response = await loginUser(
      formData
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    if (response.access_token) {
      localStorage.setItem(
        "token",
        response.access_token
      );
    }

    toast.success(
      "Login successful!",
      { id: toastId }
    );

    navigate("/dashboard");

  } catch (error: any) {

    toast.error(
      error?.response?.data?.message ||
      "Login failed",
      { id: toastId }
    );

  } finally {

    setLoading(false);

  }
};

  return (

    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">

      {/* Left Section */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden px-6 lg:px-12 py-12">

        {/* Background Glow */}
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-10"></div>

        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-lg">

          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#6C4CF1] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">

            <span className="text-3xl lg:text-4xl">
              🔐
            </span>

          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
            SPA Application
          </h1>

          <p className="text-gray-300 text-base lg:text-lg">
            Secure. Simple. Smart.
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 min-h-screen md:min-h-0">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/90 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8">

          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">

            <div className="w-16 h-16 bg-[#6C4CF1] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">

              <span className="text-2xl">
                🔐
              </span>

            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              SPA Application
            </h1>

          </div>

          {/* Heading */}
          <div className="mb-8 text-center">

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>

            <p className="text-sm sm:text-base text-gray-500">
              Login to access your account
            </p>

          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >

            {/* User ID */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                UserID
              </label>

              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition"
              />

            </div>

            {/* User name */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                User name
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition"
              />

            </div>

            {/* Role */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition"
              >

                <option value="USER">
                  General User
                </option>

                <option value="ADMIN">
                  Admin
                </option>

              </select>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6C4CF1] hover:bg-[#5938db] active:scale-[0.98] transition-all duration-200 text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-70 text-sm sm:text-base"
            >

              {
                loading
                  ? "Logging in..."
                  : "Login"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;