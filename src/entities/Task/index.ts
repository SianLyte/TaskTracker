import { taskReducer } from "./model/slice/TaskSlice";
import { TaskSchema, TaskStatus } from "./model/types/TaskSchema";
import { Task } from "./model/types/TaskSchema";
import TaskCard from "./ui/TaskCard";
import { getTasks } from "./model/selectors/getTasks";
import { getTitleQuery } from "./model/selectors/getTitleQuery";
import { getDescriptionQuery } from "./model/selectors/getDescriptionQuery";
import { useFilteredTasks } from "./lib/useFilteredTasks";
import { getTasksLoading } from "./model/selectors/getTasksLoading";
import { useTaskOverdueChecker } from "./lib/useTaskOverdueChecker";
import { getCreatingCardLoading } from "./model/selectors/getCreatingCardLoading";
import { createTask } from "./model/services/createTask";
import { deleteTask } from "./model/services/deleteTask";
import { fetchTasks } from "./model/services/fetchTasks";
import { setOverdueTasks } from "./model/services/setOverdueTasks";
import { updateTask } from "./model/services/updateTask";
import { taskActions } from "./model/slice/TaskSlice";

export {
  taskReducer,
  type TaskSchema,
  type Task,
  TaskStatus,
  TaskCard,
  getTasks,
  getTitleQuery,
  getDescriptionQuery,
  useFilteredTasks,
  getTasksLoading,
  useTaskOverdueChecker,
  getCreatingCardLoading,
  createTask,
  deleteTask,
  fetchTasks,
  setOverdueTasks,
  updateTask,
  taskActions
}