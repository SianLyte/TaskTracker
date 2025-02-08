"use client";

import { useAppDispatch } from "@/core/providers/StoreProvider";
import { createTask, getCreatingCardLoading } from "@/entities/Task";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState(false);
  const loading = useSelector(getCreatingCardLoading);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedHours = Number(hours) || 0;
    const parsedMinutes = Number(minutes) || 0;

    if (parsedHours === 0 && parsedMinutes === 0) {
      setError(true);
      alert("Enter the duration of the task (hours or minutes must be greater than 0)");
      return;
    }

    dispatch(createTask({
      title,
      description,
      duration: parsedHours * 60 + parsedMinutes,
    }));

    setTitle("");
    setDescription("");
    setHours("");
    setMinutes("");
    setError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create</h2>

      <input
        type="text"
        placeholder="title"
        className="border p-2 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="description"
        className="border p-2 w-full mt-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="hh"
          className={`border p-2 w-1/2 rounded ${error ? "border-red-500" : ""}`}
          value={hours}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) setHours(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="mm"
          className={`border p-2 w-1/2 rounded ${error ? "border-red-500" : ""}`}
          value={minutes}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) setMinutes(e.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin" /> : "create task"}
      </button>
    </form>
  );
};

export default TaskForm;
