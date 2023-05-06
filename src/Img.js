import Images from "./Hero";
import "./Img.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme();
function Img() {
  return (
    <ThemeProvider theme={theme}>
      <Images />
    </ThemeProvider>
  );
}

export default Img;
