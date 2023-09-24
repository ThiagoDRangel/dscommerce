import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import "./styles.css";

function Admin() {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
}

export default Admin;
