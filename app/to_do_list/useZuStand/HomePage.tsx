import { useEffect } from "react";
import { useTodoStore } from "./store/todo_store";
import Header from "./components/Headers";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";

export default function HomePage() {
  const load = useTodoStore((s) => s.load);
  const loading = useTodoStore((s) => s.loading);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Header title="📝 ToDoList" />
      <AddForm />

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Danh sách công việc 📋
        </h3>
        {loading ? <p className="text-center">Loading…</p> : <TodoList />}
      </div>
    </div>
  );
}
