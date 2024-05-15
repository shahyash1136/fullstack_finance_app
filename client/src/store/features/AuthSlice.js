import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "@utils/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  token: null,
  error: null,
};

export const userRegister = createAsyncThunk("register", async (data) => {
  try {
    const response = await axios
      .post(config.API_URL.register, data)
      .then((res) => {
        return res.data;
      });
    return response.data.token;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axios
      .post(`${config.API_URL.login}`, data)
      .then((res) => {
        return res.data;
      });
    return response.data.token;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AuthSlice.reducer;
