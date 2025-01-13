import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { logout } from "./features/userSlice";

function Header() {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    getAuth().signOut();
  };

  return (
    <div
      className="bg-white sticky top-0 flex justify-evenly border-b-[0.1px] border-solid
     border-gray-200 py-[10px] w-full z-[999]"
    >
      <div className="flex items-center space-x-0">
        <img
          src="https://img.icons8.com/color/48/linkedin.png"
          alt="linkedin"
          className="object-contain h-[48px] mr-[2px]"
        />

        <div className="p-[10px] flex items-center rounded-[5px] bg-[#eef3f8]">
          <SearchIcon className="" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none rounded-none bg-transparent "
            autofocus
          />
        </div>
      </div>

      <div className="flex">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption avatar={true} title="me" onClick={logoutOfApp} />
      </div>
    </div>
  );
}

export default Header;
