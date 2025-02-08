"use client";

import { useAppDispatch } from "@/core/providers/StoreProvider";
import { getDescriptionQuery, getTitleQuery, taskActions } from "@/entities/Task";
import { useSelector } from "react-redux";

export default function SearchTask() {
  const dispatch = useAppDispatch();
  const titleQuery = useSelector(getTitleQuery);
  const descriptionQuery = useSelector(getDescriptionQuery);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search</h2>
      <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
        <input
          type="text"
          placeholder="title..."
          value={titleQuery}
          onChange={(e) => dispatch(taskActions.setTitleQuery(e.target.value))}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="description..."
          value={descriptionQuery}
          onChange={(e) => dispatch(taskActions.setDescriptionQuery(e.target.value))}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
