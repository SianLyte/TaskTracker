import { TaskForm } from "@/features/createTask";
import { SearchTask } from "@/features/searchTask";
import TaskList from "@/views/tasks/ui/TaskList";

export default async function TasksPage() {

  return (
    <main className="container mx-auto p-6 flex gap-6">
      <aside className="w-80 bg-white shadow-lg p-4 rounded-xl flex flex-col gap-4">
        <SearchTask />
        <TaskForm />
      </aside>
      <section className="flex-1 bg-white shadow-lg p-6 rounded-xl">
        <TaskList />
      </section>
    </main>
  );
}
