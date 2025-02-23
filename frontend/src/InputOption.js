import React from "react";

function InputOption({ Icon, title, color, onClick }) {
  return (
    <div
      className="flex items-center text-[gray]  
    cursor-pointer hover:bg-[whitesmoke] rounded-[10px] justify-center"
      onClick={onClick}
    >
      <Icon style={{ color: color }} />
      <h4 className="ml-[5px] hidden sm:block">{title}</h4>
    </div>
  );
}

export default InputOption;
