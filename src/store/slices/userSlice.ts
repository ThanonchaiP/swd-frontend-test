import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userService } from "@/services/userService";
import { User } from "@/types";

import { RootState } from "../configureStore";

type UserState = {
  users: User[];
  selected?: User;
};

const initialState: UserState = {
  users: [],
  selected: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state) {
      const users = userService.getAll();
      state.users = users;
    },
    createUser(state, action: PayloadAction<User>) {
      const newUsers = userService.create(action.payload);
      alert("Save successfully!");
      state.users = newUsers;
    },
    updateUser(state, action: PayloadAction<User>) {
      const userId = state.selected?.id ?? "";
      const newUsers = userService.update(userId, action.payload);

      if (!newUsers) {
        alert("Update failed!");
        return;
      }

      alert("Update successfully!");
      state.users = newUsers;
    },
    removeUser(state, action: PayloadAction<string>) {
      const userId = action.payload;
      const newUsers = userService.remove(userId);

      if (!newUsers) {
        alert("Delete failed!");
        return;
      }

      alert("Delete successfully!");
      state.users = newUsers;
    },
    removeAllUser(state) {
      userService.removeAll();
      alert("Delete successfully!");
      state.users = [];
    },
    removeByIds(state, action: PayloadAction<string[]>) {
      const userIds = action.payload;
      const newUsers = userService.removeByIds(userIds);

      if (!newUsers) {
        alert("Delete failed!");
        return;
      }

      alert("Delete successfully!");
      state.users = newUsers;
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selected = action.payload;
    },
    clearSelectedUser(state) {
      state.selected = undefined;
    },
    mockData(state) {
      const users = userService.mockData();
      state.users = users;
      alert("Mock data successfully!");
    },
  },
});

export const {
  getUsers,
  createUser,
  setSelectedUser,
  clearSelectedUser,
  updateUser,
  removeAllUser,
  removeUser,
  mockData,
  removeByIds,
} = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectSelectedUser = (state: RootState) => state.user.selected;

export default userSlice.reducer;
