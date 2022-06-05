import React from "react";
import { AppBar, Toolbar } from "@mui/material";

// import app components
import logo from "../icons/logo.svg";

function Header() {
  return (
    <AppBar color="secondary">
      <Toolbar sx={{ width: "100%", margin: "0 auto" }}>
        <img src={logo} alt="Parallel Domain Logo" style={{ width: "140px" }} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
