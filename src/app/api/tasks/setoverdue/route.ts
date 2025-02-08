import { NextResponse } from "next/server";
import { TaskStatus } from "@/entities/Task";


export async function GET() {
  try {
    let overdueTaskId;
    globalThis.tasks.forEach((task) => {
      if (task.status === TaskStatus.IN_PROGRESS && task.startedAt) {
        const taskEndTime = task.startedAt + task.duration * 60 * 1000;
        if (Date.now() > taskEndTime) {
          task.status = TaskStatus.OVERDUE;
          overdueTaskId = task.id;
        }
      }
    });

    return NextResponse.json(overdueTaskId);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
