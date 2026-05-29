import {useEffect, useState} from "react";

import {FaEnvelope, FaUserShield, FaPhone, FaMapMarkerAlt, FaUser} from "react-icons/fa";

import {useNavigate} from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
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
    return (<div className="flex items-center justify-center min-h-[300px] text-gray-600 text-lg">
      Loading Profile...
    </div>);
  }

  if (!user) {
    return (<div className="flex items-center justify-center min-h-[300px] text-gray-600 text-lg">
      No Profile Found
    </div>);
  }

  return (<div className="max-w-5xl mx-auto px-2 sm:px-4">
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border overflow-hidden">
      {/* Top Banner */}
      <div className="h-32 sm:h-40 bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] relative">
        {/* Avatar */}
        <div className="
              absolute
              left-1/2 md:left-10
              transform -translate-x-1/2 md:translate-x-0
              bottom-[-45px]
              sm:bottom-[-55px]
            ">
          <div className="
                w-24 h-24
                sm:w-28 sm:h-28
                rounded-full
                border-4 border-white
                bg-white
                shadow-xl
                flex items-center justify-center
                text-[#6C4CF1]
                text-3xl sm:text-4xl
              ">
            <FaUser/>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        {/* Header */}
        <div className="
              flex flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
            ">
          {/* User Info */}
          <div className="text-center md:text-left">
            <h1 className="
                  text-2xl sm:text-3xl
                  font-bold
                  text-gray-800
                  break-words
                ">
              {user.userId}
            </h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {user.role}
            </p>
          </div>

          {/* Button */}
          <button onClick={() => navigate("/change-password")} className="
                flex items-center justify-center gap-2
                bg-[#6C4CF1]
                hover:bg-[#5938db]
                text-white
                px-5 py-3
                rounded-xl
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                w-full md:w-auto
                text-sm sm:text-base
              ">
            Change Password
          </button>
        </div>

        {/* Info Cards */}
        <div className="
              grid grid-cols-1
              md:grid-cols-2
              gap-4 sm:gap-6
              mt-8 sm:mt-10
            ">
          {/* User ID */}
          <div className="
                bg-gray-50
                rounded-2xl
                p-4 sm:p-5
                border
                hover:shadow-md
                transition
              ">
            <div className="flex items-center gap-3 mb-2">
              <FaEnvelope className="text-[#6C4CF1] text-lg"/>

              <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
                User ID
              </h2>
            </div>

            <p className="text-gray-600 break-all text-sm sm:text-base">
              {user.userId}
            </p>
          </div>

          {/* Role */}
          <div className="
                bg-gray-50
                rounded-2xl
                p-4 sm:p-5
                border
                hover:shadow-md
                transition
              ">
            <div className="flex items-center gap-3 mb-2">
              <FaUserShield className="text-[#6C4CF1] text-lg"/>

              <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
                Role
              </h2>
            </div>

            <p className="text-gray-600 text-sm sm:text-base">{user.role}</p>
          </div>

          {/* Phone */}
          <div className="
                bg-gray-50
                rounded-2xl
                p-4 sm:p-5
                border
                hover:shadow-md
                transition
              ">
            <div className="flex items-center gap-3 mb-2">
              <FaPhone className="text-[#6C4CF1] text-lg"/>

              <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
                Phone
              </h2>
            </div>

            <p className="text-gray-600 text-sm sm:text-base">
              +91 9876543210
            </p>
          </div>

          {/* Location */}
          <div className="
                bg-gray-50
                rounded-2xl
                p-4 sm:p-5
                border
                hover:shadow-md
                transition
              ">
            <div className="flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-[#6C4CF1] text-lg"/>

              <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
                Location
              </h2>
            </div>

            <p className="text-gray-600 text-sm sm:text-base">India</p>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Profile;
