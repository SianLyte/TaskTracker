import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteTask = createAsyncThunk<string, string>(
  "tasks/deleteTask",
  async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    return id;
  }
);