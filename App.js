import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// import app components
import Header from "./components/Header";
import Home from "./components/Home";
import theme from "./theme/mui";
import Banner from "./components/Banner";
import Data from "./components/Data";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />
      <Banner />
      <Home />
      <Data />
    </ThemeProvider>
  );
}

export default App;
