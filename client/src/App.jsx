import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@store/store";
import "./App.scss";
import Login from "@components/Auth/Login";
import Register from "@components/Auth/Register";
import Home from "@components/Home";
import PrivateRoutes from "./PrivateRoute";

const defaultTheme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
