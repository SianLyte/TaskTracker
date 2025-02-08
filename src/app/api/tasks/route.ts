import { Task, TaskStatus } from "@/entities/Task";
import { NextResponse } from "next/server";



if (!globalThis.tasks) {
  globalThis.tasks = [
    { id: "1", title: "Сделать UI", description: "Нарисовать прототип", status: TaskStatus.CREATED, duration: 125 },
    { id: "2", title: "Redux Setup", description: "Настроить Redux Toolkit", status: TaskStatus.CREATED, duration: 93 },
  ];
}
export async function GET() {
  await new Promise((res) => setTimeout(res, 1000));
  return NextResponse.json(globalThis.tasks);
}

export async function POST(req: Request) {
  const { title, description, duration } = await req.json();
  const newTask : Task = {
    id: Date.now().toString(),
    title,
    description,
    status: TaskStatus.CREATED,
    duration,
  };

  globalThis.tasks.push(newTask);
  return NextResponse.json(newTask);
}

export async function PATCH(req: Request) {

  const { id, status, startedAt, completedAt } = await req.json();
  let newTask;
  globalThis.tasks = globalThis.tasks.map((task) => {
    if (task.id == id) {
      newTask = {
        ...task,
        startedAt: startedAt ?? null,
        completedAt: completedAt ?? null,
        status
      }
      return newTask;

    }
    return task;
  }
  );
  return NextResponse.json(newTask);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  globalThis.tasks = globalThis.tasks.filter((task) => task.id !== id);
  return NextResponse.json({ success: true });
}


