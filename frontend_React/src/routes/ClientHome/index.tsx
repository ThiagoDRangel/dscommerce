import HeaderClient from "../../components/HeaderClient";
import { Outlet } from "react-router-dom";

function ClientHome() {
  return (
    <>
     <HeaderClient />
     <Outlet />
    </>
  );
}

export default ClientHome;
