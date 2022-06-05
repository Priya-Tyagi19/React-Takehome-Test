import React from "react";
import { Typography } from "@mui/material";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <Typography variant="h2" sx={{ textAlign: "center", pt: "50px" }}>
        Join Us
      </Typography>
    </div>
  );
};

export default Banner;
