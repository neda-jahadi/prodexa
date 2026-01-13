import Breadcrumbs from "../components/Breadcrumbs";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      <Outlet />
    </div>
  );
};

export default RootLayout;
