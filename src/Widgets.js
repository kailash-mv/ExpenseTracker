import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="flex p-[10px] cursor-pointer hover:bg-[whitesmoke]">
      <div className="text-[#0177b7] mr-[5px]">
        <FiberManualRecordIcon sx={{ fontSize: 15 }} />
      </div>
      <div className="flex-[1] ">
        <h4 className="font-bold text-[14px]">{heading}</h4>
        <p className="text-[12px] text-[gray]">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div
      className=" sticky top-[80px] flex-[0.2] bg-white rounded-[10px] 
    border-[1px] border-solid border-[lightgray] 
    h-fit pb-[10px] "
    >
      <div className="flex items-center justify-evenly p-[10px]">
        <h2 className="text-[16px] font-[400]">LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
      {newsArticle("Hi!!!!", "Top news-10000 readers")}
    </div>
  );
}

export default Widgets;
