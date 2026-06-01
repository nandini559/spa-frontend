import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./pages/auth/login";
import DashboardLayout from "./components/dashboardLayout";

import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Records from "./pages/records/records";
import Profile from "./pages/profile/profile";
import ChangePassword from "./pages/profile/changePassword";
import ProtectedRoute from "./pages/auth/protectedRoute";

function App() {
  return (<BrowserRouter>
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />}/> {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />}/>

          <Route path="/users" element={<Users />}/>

          <Route path="/records" element={<Records />}/>

          <Route path="/profile" element={<Profile />}/>

          <Route path="/change-password" element={<ChangePassword />}/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>);
}

export default App;
