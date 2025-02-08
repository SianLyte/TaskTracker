import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "../types/TaskSchema";
import { StateSchema } from "@/core/providers/StoreProvider";

interface Returned {
  task: Task; status: TaskStatus
}

interface Options {
  state: StateSchema
}

export const updateTask = createAsyncThunk<Task, Returned, Options>(
  "tasks/updateTask",
  async ({ task, status }, {getState, rejectWithValue}) => {

    if (status == TaskStatus.IN_PROGRESS) {
      const activeTask : Task | undefined = getState().tasks.tasks.find((t) => t.status === TaskStatus.IN_PROGRESS);
      if (activeTask) {
        return rejectWithValue("You can only run one task at a time!");
      }

      task = {
        ...task,
        status,
        startedAt: Date.now(),
      }
    }

    if (status == TaskStatus.COMPLETED) {
      task = {
        ...task,
        status, 
        completedAt:Date.now(),
      }
    }

    const response = await fetch("/api/tasks", {
      method: "PATCH",
      body: JSON.stringify(task),
    });
    return response.json();
  }
);