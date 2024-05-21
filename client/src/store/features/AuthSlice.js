import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "@utils/config";
import axiosInstance from "@utils/axiosConfig";
import { setLocalStorage, getLocalStorage } from "@utils/common";

const initialState = {
  isLoading: false,
  isAuthorized: getLocalStorage("isAuthorized") || false,
  error: null,
};

export const userRegister = createAsyncThunk(
  "register",
  async (data, thunkApi) => {
    try {
      await axiosInstance
        .post(config.API_URL.register, data, { withCredentials: true })
        .then((res) => {
          return res.data;
        });
      return;
    } catch (error) {
      // Pass the error response to be handled in the rejected case
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk("login", async (data, thunkApi) => {
  try {
    await axiosInstance.post(`${config.API_URL.login}`, data, {
      withCredentials: true,
    });
  } catch (error) {
    // Pass the error response to be handled in the rejected case
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthorized = false;
      setLocalStorage("isAuthorized", false);
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    },
    setAuthorized(state, action) {
      state.isAuthorized = action.payload;
      setLocalStorage("isAuthorized", action.payload);
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        setLocalStorage("isAuthorized", true);
        state.isLoading = false;
        state.isAuthorized = true;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        setLocalStorage("isAuthorized", false);
        state.isLoading = false;
        state.isAuthorized = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        setLocalStorage("isAuthorized", true);
        state.isLoading = false;
        state.isAuthorized = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        setLocalStorage("isAuthorized", false);
        state.isLoading = false;
        state.isAuthorized = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAuthorized } = AuthSlice.actions;

export default AuthSlice.reducer;
