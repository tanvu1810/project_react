import { useEffect, useState, useCallback } from "react";

import type { ToDo } from "./types/todos";

import Header from "./components/Headers";
import ToDoAdd from "./components/ToDoAdd";
import ToDoList from "./components/ToDoList";
import { fetchData, addToDoItem } from "./api/api";

export default function HomePage() {
  const [list, setList] = useState<ToDo[]>([]);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Header title="📝 ToDoList" />

      <ToDoAdd onAdd={itemAdd} />

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Danh sách công việc 📋
        </h3>
        <ToDoList list={list} setList={setList} />
      </div>
    </div>
  );
}
