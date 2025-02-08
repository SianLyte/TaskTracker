import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types/TaskSchema";

export const createTask = createAsyncThunk<Task, Omit<Task, "id" | "status">>(
  "tasks/createTask",
  async (taskData) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    return response.json();
  }
);