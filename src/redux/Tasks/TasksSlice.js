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
      state.allTasks.map((task) => {
        if (task.id === action.payload.id)
          return {
            ...task,
            name: action.payload.name,
            description: action.payload.description,
          };
      });
    },
  },
});

export const taskReducer = taskSlice.reducer;
export const { addTask, deleteTask, editTask } = taskSlice.actions;
