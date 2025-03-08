import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { RouteConstants } from "./Constants";
import PublicRoute from "./components/PublicRoute";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={RouteConstants.LOGIN_ROUTE} />}
        />
        <Route
          path={RouteConstants.LOGIN_ROUTE}
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          path={RouteConstants.REGISTER_ROUTE}
          element={<PublicRoute element={<Register />} />}
        />
        <Route
          path={RouteConstants.FORGOT_PASSWORD_ROUTE}
          element={<ForgotPassword />}
        />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
