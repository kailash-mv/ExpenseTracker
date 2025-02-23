import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Header() {
  return (
    <div className="min-w-full sm:min-w-auto">
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
    </div>
  );
}

export default Header;
