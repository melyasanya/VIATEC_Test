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
    deleteTask(state, action) {
      const index = state.allTasks.findIndex(
        (task) => task.id === action.payload
      );
      state.allTasks.splice(index, 1);
    },
    editTask(state, action) {
      const { id, name, description } = action.payload;
      const taskIndex = state.allTasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.allTasks[taskIndex] = {
          ...state.allTasks[taskIndex],
          name,
          description,
        };
      }
    },
    editCheck(state, action) {
      const taskIndex = state.allTasks.findIndex(
        (task) => task.id === action.payload
      );
      if (taskIndex !== -1) {
        state.allTasks[taskIndex] = {
          ...state.allTasks[taskIndex],
          checked: !state.allTasks[taskIndex].checked,
        };
      }
    },
  },
});

export const taskReducer = taskSlice.reducer;
export const { addTask, deleteTask, editTask, editCheck } = taskSlice.actions;
