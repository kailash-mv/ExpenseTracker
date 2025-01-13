import React from "react";
import { forwardRef } from "react";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className="bg-white p-[15px] mb-[10px] rounded-[10px]">
      <div className="flex mb-[10px]">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="ml-[10px]">
          <h2 className="text-[15px] font-bold">{name}</h2>
          <p className="text-[12px] text-[gray]">{description}</p>
        </div>
      </div>

      <div className="break-all">
        <p>{message}</p>
      </div>

      <div className="flex justify-evenly">
        <InputOption Icon={ThumbUpAltIcon} title="Like" color="gray" />
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  );
});

export default Post;
