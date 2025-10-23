import { useEffect, useState } from "react";

import type { ToDo } from "./types/todos";

import Header from "./components/Headers";
import ToDoAdd from "./components/ToDoAdd";
import ToDoList from "./components/ToDoList";
import { fetchData, addToDoItem, updateToDoItem, delToDoItem } from "./api/api";

export default function HomePage() {
  const [list, setList] = useState<ToDo[]>([]);
  const [item, setItem] = useState("");
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
    return () => controller.abort();
  }, []);

  // Add Item
  const itemAdd = async (name: string) => {
    try {
      const data = await addToDoItem(name);

      const created = Array.isArray(data)
        ? null
        : ((data as any)?.data ?? data);
      if (created && !Array.isArray(created)) {
        setList((prev) => [...prev, created as ToDo]);
      } else {
        setList(Array.isArray(data) ? data : ((data as any)?.data ?? []));
      }
      setItem("");
      console.log(`Item ${name} added successfully.`);
    } catch (error) {
      console.error("Error add item: ", error);
    }
  };

  const handleStartEdit = (item: ToDo) => {
    setEditingId(item.id);
    setEditText(item.name ?? "");
  };

  // Huỷ sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Update Item
  const itemUpdate = async (id: string | number) => {
    const next = editText.trim();
    if (!next) return;
    try {
      await updateToDoItem(id, next);
      setList((prev) =>
        prev.map((item) =>
          String(item.id) === String(id) ? { ...item, name: next } : item
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Sửa thất bại!");
    }
  };

  // Delete Item
  const itemDelete = async (id: string | number) => {
    try {
      await delToDoItem(String(id));
      setList((preList) =>
        preList.filter((item) => String(item.id) !== String(id))
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Xoa that bai!");
    }
  };

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
