import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "@utils/config";
import axiosInstance from "@utils/axiosConfig";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const getUser = createAsyncThunk("user", async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get(`${config.API_URL.user}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default UserSlice.reducer;
