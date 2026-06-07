import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";


const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    return toast.error(
      "Passwords do not match"
    );
  }

  const toastId = toast.loading(
    "Creating account..."
  );

  try {
    setLoading(true);

    const response = await api.post(
      "/users",
      {
        userId: formData.userId,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      }
    );

    console.log(response.data);

    toast.success(
      "Account created successfully!",
      { id: toastId }
    );

    navigate("/");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Registration failed",
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

        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-10"></div>

        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 text-center text-white max-w-lg">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#6C4CF1] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-3xl lg:text-4xl">
              🚀
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
            SPA Application
          </h1>

          <p className="text-gray-300 text-base lg:text-lg">
            Create your account and get started.
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
                🚀
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              SPA Application
            </h1>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>

            <p className="text-sm sm:text-base text-gray-500">
              Join us by creating a new account
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={handleRegister}
          >

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                User ID
              </label>

              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1]"
              >
                <option value="USER">
                  General User
                </option>

                <option value="ADMIN">
                  Admin
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6C4CF1] hover:bg-[#5938db] text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-70"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() =>
                    navigate("/")
                  }
                  className="text-[#6C4CF1] font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;