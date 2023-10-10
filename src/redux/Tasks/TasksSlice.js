import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.allTasks.push(action.payload);
    },
  },
});

export const taskReducer = taskSlice.reducer;
export const { addTask } = taskSlice.actions;
