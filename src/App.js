import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, useRoutes } from "react-router-dom";
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
  const routes = useRoutes([{ path: "/", element: <TextMessage /> }]);
  return routes;
};

export default App;
