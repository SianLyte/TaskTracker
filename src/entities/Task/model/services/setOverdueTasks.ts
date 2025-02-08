import { createAsyncThunk } from "@reduxjs/toolkit";

export const setOverdueTasks = createAsyncThunk<string[]>(
  "tasks/setOverdueTasks",
  async () => {
    const response = await fetch("/api/tasks/setoverdue");
    return response.json();
  }
);