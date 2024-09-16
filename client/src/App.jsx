import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@store/store";
import "./App.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "@components/Auth/Login";
import Register from "@components/Auth/Register";
import Home from "@components/Home";
import PrivateRoutes from "./PrivateRoute";
import Header from "@components/global/Header";
import Sidebar from "@components/global/Sidebar";

function App() {
  const location = useLocation();
  const hideHeaderAndSidebar = ["/login", "/register"].includes(
    location.pathname
  );
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='main__content'>
            {!hideHeaderAndSidebar && <Sidebar isSidebar={isSidebar} />}
            <div className='content'>
              {!hideHeaderAndSidebar && <Header setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path='/' element={<Home />} />
                </Route>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
