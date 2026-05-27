import {useEffect, useState} from "react";

import {FaEnvelope, FaUserShield, FaPhone, FaMapMarkerAlt, FaEdit} from "react-icons/fa";

import {getUsers} from "../../api/userApi";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const users = await getUsers();

      // temporary first user
      setUser(users[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-10">No Profile Found</div>;
  }

  return (<div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
      {/* Top Banner */}
      <div className="h-40 bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] relative"></div>

      {/* Profile Content */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.userId}
            </h1>

            <p className="text-gray-500 mt-1">{user.role}</p>
          </div>

          <button className="flex items-center gap-2 bg-[#6C4CF1] hover:bg-[#5938db] text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
            <FaEdit/>
            Edit Profile
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Email */}
          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaEnvelope className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">User ID</h2>
            </div>

            <p className="text-gray-600">{user.userId}</p>
          </div>

          {/* Role */}
          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaUserShield className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Role</h2>
            </div>

            <p className="text-gray-600">{user.role}</p>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaPhone className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Phone</h2>
            </div>

            <p className="text-gray-600">+91 9876543210</p>
          </div>

          {/* Location */}
          <div className="bg-gray-50 rounded-2xl p-5 border">
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-[#6C4CF1]"/>

              <h2 className="font-semibold text-gray-700">Location</h2>
            </div>

            <p className="text-gray-600">India</p>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Profile;
