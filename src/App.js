import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, useLocation, useRoutes } from "react-router-dom";
import ImageMessage from "./screen/ImageMessage";
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
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  );
}

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/image", element: <TextMessage image /> },
    { path: "/youtube", element: <TextMessage youtube /> },
    { path: "/detail", element: <ImageMessage /> },
  ]);
  const loc = useLocation();
  console.log("kks", loc);

  return routes;
};

export default App;
