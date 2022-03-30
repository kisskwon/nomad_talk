import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import StoreObserver from "./firebase/StoreObserver";
import Idle from "./screen/Idle";
import ImageViewer from "./screen/ImageViewer";
import SliderMessage from "./screen/SliderMessage";
import TextMessage from "./screen/TextMessage";
import NetflixMessage from "./screen/NetflixMessage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 32,
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <HashRouter>
          <AppRoutes />
          <StoreObserver />
        </HashRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Idle /> },
    { path: "/image", element: <TextMessage image /> },
    { path: "/slider", element: <TextMessage slider /> },
    { path: "/youtube", element: <TextMessage youtube /> },
    { path: "/detail", element: <SliderMessage /> },
    { path: "/viewer", element: <ImageViewer /> },
    { path: "/shopping", element: <TextMessage shopping /> },
    { path: "/netflix", element: <NetflixMessage /> },
  ]);
  return routes;
};

export default App;