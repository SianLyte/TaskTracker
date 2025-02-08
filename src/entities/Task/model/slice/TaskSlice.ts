import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskSchema, TaskStatus } from '../types/TaskSchema';
import { fetchTasks } from '../services/fetchTasks';
import { createTask } from '../services/createTask';
import { updateTask } from '../services/updateTask';
import { deleteTask } from '../services/deleteTask';
import { setOverdueTasks } from '../services/setOverdueTasks';

const initialState: TaskSchema = {
  tasks: [],
  activeTaskId: null,
  titleQuery: "",
  descriptionQuery: "",
  loadingId: "",
  deleteLoadingId: "",
  creatingCardLoading: false,
  loading: false
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTitleQuery(state, action: PayloadAction<string>) {
      state.titleQuery = action.payload;
    },
    setDescriptionQuery(state, action: PayloadAction<string>) {
      state.descriptionQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.creatingCardLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.creatingCardLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.creatingCardLoading =false;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.loadingId = action.meta.arg.task.id;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          task.status = action.payload.status;
          task.startedAt = action.payload.startedAt;
          task.completedAt = action.payload.completedAt;
        }

        state.loadingId = "";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loadingId = "";
        alert(action.payload);
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.deleteLoadingId = action.meta.arg;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        state.deleteLoadingId = "";
      })
      .addCase(deleteTask.rejected, (state) => {
        state.deleteLoadingId = "";
      })
      .addCase(setOverdueTasks.fulfilled, (state,action) => {
        state.tasks = state.tasks.map((task) => {
          if (action.payload === task.id) {
            return {
              ...task,
              status: TaskStatus.OVERDUE
            }
          }
          return task;
        })
      })
  },
});

export const { actions : taskActions } = taskSlice;
export const { reducer : taskReducer} = taskSlice;
