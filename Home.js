import React from "react";
import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box sx={{ maxWidth: "1024px", width: "100%", margin: "0 auto", py: 5 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        Open Positions
      </Typography>
      <Typography
        sx={{ textAlign: "center", maxWidth: "768px", margin: "0 auto" }}
      >
        Our data is training and testing autonomous systems at companies around
        the world. We're looking for talented visionaries to help us to expand
        our impact on the way artificial intelligence is developed.
      </Typography>
    </Box>
  );
}

export default Home;
