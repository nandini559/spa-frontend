import {FaEnvelope, FaUserShield, FaPhone, FaMapMarkerAlt, FaEdit} from "react-icons/fa";

const Profile = () => {
  return (<div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
      {/* Top Banner */}
      <div className="h-40 bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] relative">
        <div className="absolute -bottom-14 left-8">
          <img src="https://i.pravatar.cc/150" alt="profile" className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"/>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>

            <p className="text-gray-500 mt-1">General User</p>
          </div>

          <button className="flex items-center gap-2 bg-[#6C4CF1] hover:bg-[#5938db] text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
            <FaEdit/>
            Edit Profile
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaEnvelope className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Email</h2>
            </div>

            <p className="text-gray-600">john@gmail.com</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaUserShield className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Role</h2>
            </div>

            <p className="text-gray-600">User</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaPhone className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Phone</h2>
            </div>

            <p className="text-gray-600">+91 9876543210</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Location</h2>
            </div>

            <p className="text-gray-600">Kolkata, India</p>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Profile;
