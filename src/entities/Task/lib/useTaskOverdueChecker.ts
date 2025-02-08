'use client'

import { useAppDispatch } from "@/core/providers/StoreProvider";
import { useEffect } from "react";
import { setOverdueTasks } from "../model/services/setOverdueTasks";
import { useSelector } from "react-redux";
import { getTasks } from "../model/selectors/getTasks";
import { TaskStatus } from "../model/types/TaskSchema";

export const useTaskOverdueChecker = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(getTasks);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tasks.find((task) => task.status === TaskStatus.IN_PROGRESS)) {
        dispatch(setOverdueTasks());
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [tasks]);
};