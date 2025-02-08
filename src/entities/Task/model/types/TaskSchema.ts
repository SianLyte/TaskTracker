
export enum TaskStatus {
  CREATED = "Created",
  IN_PROGRESS = "In progress",
  COMPLETED = "Completed",
  OVERDUE = "Overdue",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  status: TaskStatus;
  startedAt?: number; //timestamp ms
  completedAt?: number; //timestamp ms
}

export interface TaskSchema {
  tasks: Task[];
  activeTaskId: string | null;
  titleQuery: string;
  descriptionQuery: string;
  loadingId: string
  deleteLoadingId: string;
  creatingCardLoading: boolean;
  loading: boolean;
}