import { useEffect, useState, useCallback } from "react";

import type { ToDo } from "./types/todos";

import Header from "./components/Headers";
import ToDoAdd from "./components/ToDoAdd";
import ToDoList from "./components/ToDoList";
import { fetchData, addToDoItem, updateToDoItem, delToDoItem } from "./api/api";

export default function HomePage() {
  const [list, setList] = useState<ToDo[]>([]);
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | number | null>(null);

  // Fetch Data
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await fetchData();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => controller.abort(); // Có settimeOut hủy request fetch api
  }, []);

  // Add Item
  const itemAdd = useCallback(async (name: string) => {
    try {
      const data = await addToDoItem(name);
      setList((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error add item: ", error);
    }
  }, []);

  const handleStartEdit = useCallback((item: ToDo) => {
    setEditingId(item.id);
    setEditText(item.name ?? "");
  }, []);

  // Huỷ sửa
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditText("");
  }, []);

  // Update Item
  const itemUpdate = useCallback(
    async (id: string) => {
      const todoNew = editText.trim();
      if (!todoNew) return;
      try {
        await updateToDoItem(id, todoNew);
        setList((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, name: todoNew } : item
          )
        );
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.error("Update failed:", error);
        alert("Sửa thất bại!");
      }
    },
    [editText]
  );

  // Delete Item
  const itemDelete = useCallback(async (id: string) => {
    try {
      await delToDoItem(id);
      setList((preList) => preList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Xoa that bai!");
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Header title="📝 ToDoList" />
      <ToDoAdd onAdd={itemAdd} />

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Danh sách công việc 📋
        </h3>

        <ToDoList
          items={list}
          editingId={editingId}
          editText={editText}
          onStartEdit={handleStartEdit}
          onChangeEditText={setEditText}
          onUpdateItem={itemUpdate}
          onCancelEdit={handleCancelEdit}
          onDeleteItem={itemDelete}
        />
      </div>
    </div>
  );
}
