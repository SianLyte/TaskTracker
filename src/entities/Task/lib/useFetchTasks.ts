import { useEffect, useState } from "react";
import { Task } from "../model/types/TaskSchema";

export function useFetchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } finally {
      }
    }

    fetchTasks();
  }, []);

  return tasks;
}
