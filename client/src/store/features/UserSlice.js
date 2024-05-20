import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@utils/config";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export const getUser = createAsyncThunk("user", async (_, thunkApi) => {
  try {
    const { data } = await axios.get(`${config.API_URL.user}`, {
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
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default UserSlice.reducer;
