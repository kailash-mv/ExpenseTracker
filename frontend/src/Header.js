// import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import HeaderOption from "./HeaderOption";
// import HomeIcon from "@mui/icons-material/Home";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ChatIcon from "@mui/icons-material/Chat";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useDispatch } from "react-redux";
// import { getAuth } from "firebase/auth";
// import { logout } from "./features/userSlice";

// function Header() {
//   const dispatch = useDispatch();
//   const logoutOfApp = () => {
//     dispatch(logout());
//     getAuth().signOut();
//   };

//   return <div className="py-[10px]"></div>;
// }

// export default Header;

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Header() {
  return (
    <AppBar position="static" className="text-blue-500">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ExpenseTracker+
        </Typography>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
