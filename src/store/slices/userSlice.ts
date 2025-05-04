import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { t } from "i18next";

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
      alert(t("createSuccess"));
      state.users = newUsers;
    },
    updateUser(state, action: PayloadAction<User>) {
      const userId = state.selected?.id ?? "";
      const newUsers = userService.update(userId, action.payload);

      if (!newUsers) {
        alert(t("updateFailed"));
        return;
      }

      alert(t("updateSuccess"));
      state.users = newUsers;
    },
    removeUser(state, action: PayloadAction<string>) {
      const userId = action.payload;
      const newUsers = userService.remove(userId);

      if (!newUsers) {
        alert(t("deleteFailed"));
        return;
      }

      alert(t("deleteSuccess"));
      state.users = newUsers;
    },
    removeAllUser(state) {
      userService.removeAll();
      alert(t("deleteSuccess"));
      state.users = [];
    },
    removeByIds(state, action: PayloadAction<string[]>) {
      const userIds = action.payload;
      const newUsers = userService.removeByIds(userIds);

      if (!newUsers) {
        alert(t("deleteFailed"));
        return;
      }

      alert(t("deleteSuccess"));
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
      alert(t("mockDataSuccess"));
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
