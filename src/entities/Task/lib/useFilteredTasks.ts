'use client'

import { useMemo } from "react";
import { getTasks } from "../model/selectors/getTasks";
import { useSelector } from "react-redux";
import { getTitleQuery } from "../model/selectors/getTitleQuery";
import { getDescriptionQuery } from "../model/selectors/getDescriptionQuery";

export function useFilteredTasks() {
  const tasks = useSelector(getTasks);
  const titleQuery = useSelector(getTitleQuery);
  const descriptionQuery = useSelector(getDescriptionQuery);


  return useMemo(() => {
    if (!titleQuery && !descriptionQuery) return tasks;

    return tasks.filter((task) => {
      const matchesTitle = titleQuery
        ? task.title.toLowerCase().includes(titleQuery.toLowerCase())
        : true;

      const matchesDescription = descriptionQuery
        ? task.description.toLowerCase().includes(descriptionQuery.toLowerCase())
        : true;

      return matchesTitle && matchesDescription;
    });
  }, [titleQuery, descriptionQuery, tasks]);
}
