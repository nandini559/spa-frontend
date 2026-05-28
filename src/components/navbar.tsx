import { useEffect, useState } from "react";

const Navbar = () => {

  const [user, setUser] = useState<any>(null);

  const fetchUser = () => {

    try {

      const loggedInUser =
        localStorage.getItem("user");

      if (loggedInUser) {

        setUser(
          JSON.parse(loggedInUser)
        );

      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchUser();

    // listen for localStorage changes
    window.addEventListener(
      "storage",
      fetchUser
    );

    return () => {

      window.removeEventListener(
        "storage",
        fetchUser
      );
    };

  }, []);

  return (

    <header className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">

      {/* Left */}
      <div>

        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* User */}
        <div className="flex items-center gap-3">

          {/* User Info */}
          <div className="hidden sm:block">

            <h2 className="font-semibold text-gray-700">

              {
                user?.userId ||
                "Loading..."
              }

            </h2>

            <p className="text-sm text-gray-500">

              {
                user?.role ||
                "User"
              }

            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;