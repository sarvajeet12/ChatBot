import React, { useContext, useState } from "react";
import { AppContext } from "../context/common-store";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from "../components/sidebar";
import Conversation from "../components/conversation";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useContext(AppContext);

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboardContainer">
      <div className="menu">
        {menu ? (
          <IoClose className="menu-icon" onClick={() => handleMenu()} />
        ) : (
          <RxHamburgerMenu className="menu-icon" onClick={() => handleMenu()} />
        )}
      </div>
      <div className="dashboardContent">
        <SideBar menu={menu} />
        <Conversation />
      </div>
    </div>
  );
};

export default Dashboard;
