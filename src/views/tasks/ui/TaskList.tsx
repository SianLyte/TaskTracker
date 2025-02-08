"use client";

import { fetchTasks, getTasksLoading, TaskCard, TaskStatus, useFilteredTasks, useTaskOverdueChecker } from "@/entities/Task";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/core/providers/StoreProvider";


const TaskList = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getTasksLoading);
  const skipFirstRender = useRef(true);
  const filteredTasks = useFilteredTasks();

  useEffect(() => {
    dispatch(fetchTasks());
    skipFirstRender.current = false;
  }, []);

  useTaskOverdueChecker();

  if (loading || skipFirstRender.current) return <p className="text-center text-gray-500">Loading tasks...</p>

  return (
    <div className="h-full grid grid-cols-4 gap-4 mt-4">
      {Object.entries(TaskStatus).map(([status, title]) => (
        <div key={status} className="bg-gray-50 p-1 rounded-lg shadow">
          <h2 className="font-bold text-lg p-2">{title}</h2>
          {filteredTasks
            .filter((task) => task.status === title)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
