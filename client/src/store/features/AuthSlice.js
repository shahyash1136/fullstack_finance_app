import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "@utils/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  isAutherized: false,
  error: null,
};

export const userRegister = createAsyncThunk(
  "register",
  async (data, thunkApi) => {
    try {
      const response = await axios
        .post(config.API_URL.register, data)
        .then((res) => {
          return res.data;
        });
      return response.data;
    } catch (error) {
      // Pass the error response to be handled in the rejected case
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk("login", async (data, thunkApi) => {
  try {
    const response = await axios
      .post(`${config.API_URL.login}`, data)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (error) {
    // Pass the error response to be handled in the rejected case
    return thunkApi.rejectWithValue(error.response.data);
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
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isAutherized = true;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isAutherized = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.isAutherized = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAutherized = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
