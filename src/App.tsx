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
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointments from "./pages/Appointments";
import HelpCenter from "./pages/HelpCenter";

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
          path={RouteConstants.FORGOT_PASSWORD_ROUTE}
          element={<ForgotPassword />}
        />
        <Route
          path={RouteConstants.APPOINTMENT_ROUTE}
          element={
            <ProtectedRoute title="Appointments" element={<Appointments />} />
          }
        />
        <Route
          path={RouteConstants.HELP_CENTER_ROUTE}
          element={
            <ProtectedRoute title="Help Center" element={<HelpCenter />} />
          }
        />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
