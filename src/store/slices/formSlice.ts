import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userService } from "@/services/userService";
import { User } from "@/types";

import { RootState } from "../configureStore";

type FormState = {
  selected?: User;
};

const initialState: FormState = {
  selected: undefined,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createUser(_, action: PayloadAction<User>) {
      userService.create(action.payload);
      alert("Save successfully!");
    },
    updateUser(state, action: PayloadAction<User>) {
      const userId = state.selected?.id ?? "";
      const updatedUser = userService.update(userId, action.payload);

      if (updatedUser) alert("Update successfully!");
      else alert("Update failed!");
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selected = action.payload;
    },
    clearSelectedUser(state) {
      state.selected = undefined;
    },
  },
});

export const { createUser, setSelectedUser, clearSelectedUser, updateUser } =
  formSlice.actions;

export const selectSelectedUser = (state: RootState) => state.form.selected;

export default formSlice.reducer;
