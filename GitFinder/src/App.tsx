import { BrowserRouter,Routes, Route }  from "react-router-dom";
import Navbar from "./pages/components/navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import About from "./pages/About";
import { ROUTES } from './const';


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.USER} element={<UserDetail />} />
          <Route path={ROUTES.ABOUT} element={<About />} />

        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}