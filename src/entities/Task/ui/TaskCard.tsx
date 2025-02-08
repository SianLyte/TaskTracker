"use client";

import { TaskStatus, type Task } from "../model/types/TaskSchema";
import { Loader2, X } from "lucide-react";
import { formatTime } from "@/shared/lib/formatTime";
import { deleteTask } from "../model/services/deleteTask";
import { updateTask } from "../model/services/updateTask";
import { useAppDispatch } from "@/core/providers/StoreProvider";
import { useSelector } from "react-redux";
import { getTaskCardDeleteLoadingId } from "../model/selectors/getTaskCardDeleteLoadingId";
import { getTaskCardLoadingId } from "../model/selectors/getTaskCardLoadingId";


interface TaskProps {
  task: Task;
}

const TaskCard = ({ task }: TaskProps) => {
  const dispatch = useAppDispatch();
  const deleteLoadingId = useSelector(getTaskCardDeleteLoadingId);
  const loadingId = useSelector(getTaskCardLoadingId);

  const isDeleting = deleteLoadingId === task.id;
  const isUpdating = loadingId === task.id;

  const remainingTime =
    task.status === TaskStatus.IN_PROGRESS && task.startedAt
      ? Math.max(task.startedAt + task.duration * 60000 - Date.now(), 0)
      : 0;

  const completedTime =
    task.status === TaskStatus.COMPLETED && task.completedAt
      ? task.completedAt - task.startedAt!
      : null;

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200 relative">
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
      >
        {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
      </button>

      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      <p className="text-xs text-gray-500 mt-2">
        {task.status === TaskStatus.IN_PROGRESS ? (
          <>
            {formatTime(remainingTime)} / {formatTime(task.duration * 60000)}
          </>
        ) : task.status === TaskStatus.COMPLETED ? (
          <>
            {formatTime(completedTime || 0)} / {formatTime(task.duration * 60000)}
          </>
        ) : (
          <> {formatTime(task.duration * 60000)}</>
        )}
      </p>

      {task.status === TaskStatus.CREATED && (
        <button
          onClick={() => dispatch(updateTask({ task, status: TaskStatus.IN_PROGRESS }))}
          className="bg-green-500 text-white px-3 py-1 mt-3 w-full rounded-lg flex justify-center items-center"
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : "start"}
        </button>
      )}

      {task.status === TaskStatus.IN_PROGRESS && (
        <button
          onClick={() => dispatch(updateTask({ task, status: TaskStatus.COMPLETED }))}
          className="bg-blue-500 text-white px-3 py-1 mt-3 w-full rounded-lg flex justify-center items-center"
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : "finish"}
        </button>
      )}
    </div>
  );
};

export default TaskCard;
