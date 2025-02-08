import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types/TaskSchema";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await fetch("/api/tasks");
    return response.json();
  }
);