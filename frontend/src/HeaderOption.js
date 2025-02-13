import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function HeaderOption({ avatar, Icon, title, onClick }) {
  const user = useSelector(selectUser);
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center mr-[20px] cursor-pointer text-gray-500 hover:text-black"
    >
      {Icon && <Icon className="object-contain !h-[25px] !w-[25px]" />}
      {avatar && (
        <Avatar
          src={user?.photoUrl}
          className="object-contain !h-[50px] !w-[50px]"
        >
          {user?.email[0]}
        </Avatar>
      )}
      <h3 className="text-[12px] font-[400]"> {title}</h3>
    </div>
  );
}

export default HeaderOption;
