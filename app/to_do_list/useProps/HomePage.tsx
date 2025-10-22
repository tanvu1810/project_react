import { useEffect, useState } from "react";
import { AddForm, Header, TodoList } from "./components";
import type { Todo } from "./types/todo";
import { fetchTodos, createTodo, deleteTodo, updateTodo } from "./api/taskApi";

export function HomePage() {
  const [listItem, setList] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editText, setEditText] = useState("");

  // load lần đầu
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await fetchTodos();
        setList(data);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => controller.abort();
  }, []);

  // add
  const handleAdd = async (name: string) => {
    try {
      const data = await createTodo(name);
      const created = Array.isArray(data)
        ? null
        : ((data as any)?.data ?? data);
      if (created && !Array.isArray(created)) {
        setList((prev) => [...prev, created as Todo]);
      } else {
        setList(Array.isArray(data) ? data : ((data as any)?.data ?? []));
      }
      console.log(`Item "${name}" added successfully.`);
    } catch (e) {
      console.error("Add failed:", e);
      alert("Thêm thất bại!");
    }
  };

  // delete
  const handleDelete = async (id: string | number) => {
    try {
      await deleteTodo(String(id));
      setList((prev) => prev.filter((x) => String(x.id) !== String(id)));
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Xoá thất bại!");
    }
  };

  // edit flow
  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.name ?? "");
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };
  const handleConfirmEdit = async (id: string | number) => {
    const next = editText.trim();
    if (!next) return;
    try {
      await updateTodo(id, next);
      setList((prev) =>
        prev.map((t) =>
          String(t.id) === String(id) ? { ...t, name: next } : t
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (e) {
      console.error("Update failed:", e);
      alert("Sửa thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Header title="📝 ToDoList" />
      <AddForm onAdd={handleAdd} />

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Danh sách công việc 📋
        </h3>

        <TodoList
          items={listItem}
          editingId={editingId}
          editText={editText}
          onStartEdit={handleStartEdit}
          onChangeEditText={setEditText}
          onConfirmEdit={handleConfirmEdit}
          onCancelEdit={handleCancelEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
