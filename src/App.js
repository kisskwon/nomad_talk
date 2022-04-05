import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import StoreObserver from "./firebase/StoreObserver";
import Idle from "./screen/Idle";
import ImageViewer from "./screen/ImageViewer";
import LauncherMessage from "./screen/LauncherMessage";
import SliderMessage from "./screen/SliderMessage";
import TextMessage from "./screen/TextMessage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 32,
  },
});

let cnt = 0;

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
    { path: "/image", element: <TextMessage image key={cnt++} /> },
    { path: "/slider", element: <TextMessage slider key={cnt++} /> },
    { path: "/youtube", element: <TextMessage youtube key={cnt++} /> },
    { path: "/kakaotalk", element: <TextMessage kakaotalk key={cnt++} /> },
    { path: "/detail", element: <SliderMessage key={cnt++} /> },
    { path: "/viewer", element: <ImageViewer /> },
    { path: "/shopping", element: <LauncherMessage shopping key={cnt++} /> },
    { path: "/netflix", element: <LauncherMessage key={cnt++} /> },
    { path: "/drawmemo", element: <SliderMessage memo key={cnt++} /> },
  ]);
  return routes;
};

export default App;
