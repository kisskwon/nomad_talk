import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import StoreObserver from "./firebase/StoreObserver";
import ImageMessage from "./screen/ImageMessage";
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
    { path: "/", element: <></> },
    { path: "/image", element: <TextMessage image /> },
    { path: "/youtube", element: <TextMessage youtube /> },
    { path: "/detail", element: <ImageMessage /> },
    { path: "/detail2", element: <SliderMessage /> },
  ]);
  return routes;
};

export default App;
