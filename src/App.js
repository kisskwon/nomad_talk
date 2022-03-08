import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
  // const routes = useRoutes([{ path: "/", element: <Home /> }]);
  // return routes;
  return null;
};

export default App;
