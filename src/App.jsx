import Weather from "./components/Weather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box } from "@mui/material";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar /> {/* ✅ Navbar is now ABOVE everything */}
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Container maxWidth="md" sx={{ flex: 1, mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* ✅ Correct usage of ProtectedRoute */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Weather />} />
                </Route>
              </Routes>
            </Container>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
