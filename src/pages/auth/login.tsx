import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e : React.FormEvent) => {
    e.preventDefault();

    // later add API authentication here

    navigate("/dashboard");
  };

  return (<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
    {/* Left Section */}
    <div className="hidden md:flex items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative z-10 text-center text-white">
        <div className="w-24 h-24 bg-[#6C4CF1] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <span className="text-4xl">🔐</span>
        </div>

        <h1 className="text-5xl font-extrabold mb-4">SPA Application</h1>

        <p className="text-gray-300 text-lg">Secure. Simple. Smart.</p>

        <div className="mt-10 space-y-3 text-gray-400">
          <p>✔ Secure Authentication</p>
          <p>✔ Role Based Access</p>
          <p>✔ Modern Dashboard UI</p>
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500">Login to access your account</p>
        </div>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* User ID */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              User ID
            </label>

            <input type="text" placeholder="Enter your user id" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input type="password" placeholder="Enter your password" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all"/>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Role
            </label>

            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-purple-300 focus:border-[#6C4CF1] transition-all">
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox"/>
              Remember me
            </label>

            <button type="button" className="text-[#6C4CF1] hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-[#6C4CF1] hover:bg-[#5938db] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-400/40 transition-all duration-300 hover:-translate-y-1">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2026 SPA Application
        </p>
      </div>
    </div>
  </div>);
};

export default Login;
