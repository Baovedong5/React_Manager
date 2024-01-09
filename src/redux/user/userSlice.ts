import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchListUser = createAsyncThunk(
  "users/fetchListUser",
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

interface IUserPayload {
  email: string;
  name: string;
  id?: number;
}

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data;
  }
);

export const updateAUser = createAsyncThunk(
  "users/updateAUser",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data;
  }
);

interface IDeletePayload {
  id: number;
}

export const deleteAUser = createAsyncThunk(
  "users/deleteAUser",
  async (payload: IDeletePayload, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    thunkAPI.dispatch(fetchListUser());
    return data;
  }
);

interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: {
  listUser: IUser[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
} = {
  listUser: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false;
    },

    resetUpdate(state) {
      state.isUpdateSuccess = false;
    },

    resetDelete(state) {
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });

    builder.addCase(createNewUser.fulfilled, (state) => {
      state.isCreateSuccess = true;
    });
    builder.addCase(updateAUser.fulfilled, (state) => {
      state.isUpdateSuccess = true;
    });

    builder.addCase(deleteAUser.fulfilled, (state) => {
      state.isDeleteSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions;

export default userSlice.reducer;
