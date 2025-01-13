import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div
      className="flex text-[13px] text-[gray] 
    font-bold cursor-pointer mb-[5px] p-[5px]
     hover:bg-[whitesmoke] rounded-[10px] hover:text-black "
    >
      <span className="mr-[10px] ml-[5px]">#</span>
      <p>{topic} </p>
    </div>
  );

  return (
    <div className="ml-[200px] sticky top-[80px] flex-[0.2] rounded-[10px] text-center h-fit">
      <div
        className="flex flex-col items-center border-[1px] border-solid
       border-[lightgray] border-b-[1px] rounded-tl-[10px] rounded-tr-[10px]
        bg-[white] pb-[10px] "
      >
        <img
          src="https://loremflickr.com/500/500/$earth"
          alt=""
          className="-mb-[20px] w-[100%] h-[60px] rounded-tl-[10px] 
          rounded-tr-[10px] object-cover"
        />

        <Avatar className="mb-[10px]" src="user.photoUrl">
          {user.email[0]}
        </Avatar>
        <h2 className="font-bold text-black text-[18px]">{user.displayName}</h2>
        <h4 className="text-[gray] text-[12px] ">{user.email}</h4>
      </div>

      {/* Sidebar stats */}
      <div
        className="p-[10px] mb-[10px] rounded-[1px] 
      border-solid  border-[lightgray] rounded-bl-[10px] rounded-br-[10px] bg-white border-[1px]"
      >
        <div className="mt-[10px] flex justify-between">
          <p className="text-[gray] text-[13px] font-[600]">Who viewed you</p>
          <p className="font-bold text-[#0a66c2] !important">2,543</p>
        </div>

        <div className="mt-[10px] flex justify-between">
          <p className="text-[gray] text-[13px] font-[600]">Views on post</p>
          <p className="font-bold text-[#0a66c2] !important"> 2,043 </p>
        </div>
      </div>

      {/* Sidebar bottom */}
      <div
        className="text-left p-[10px] border-[1px] 
      border-solid border-[lightgray]
       bg-white rounded-[10px] mt-[10px]"
      >
        <p className="text-[13px] pb-[10px]">Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("web developer")}
        {recentItem("coding")}
      </div>
    </div>
  );
}

export default Sidebar;
