import React from "react";

function InputOption({ Icon, title, color }) {
  return (
    <div
      className="flex items-center mt-[15px] text-[gray] p-[10px] 
    cursor-pointer hover:bg-[whitesmoke] rounded-[10px]"
    >
      <Icon style={{ color: color }} />
      <h4 className="ml-[5px]">{title}</h4>
    </div>
  );
}

export default InputOption;
