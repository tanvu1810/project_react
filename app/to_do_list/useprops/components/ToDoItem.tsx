import React, { memo, useCallback, useState } from "react";
import type { ToDo } from "../types/todos";
import { delToDoItem, updateToDoItem } from "../api/api";

type ToDoItemProps = {
  item: ToDo;
  isEditing: boolean;
  setEditingId: React.Dispatch<React.SetStateAction<string | number | null>>;
  setList: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const ToDoItem = ({
  item,
  isEditing,
  setEditingId,
  setList,
}: ToDoItemProps) => {
  const [editText, setEditText] = useState("");

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

  console.log(`Render item: ${item.id}`);
  return (
    <li className="flex justify-between items-center bg-purple-50 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-100 transition">
      <div
        className="flex-1 mr-3 cursor-text"
        onClick={() => !isEditing && handleStartEdit(item)}
        title={!isEditing ? "Click để sửa" : ""}
      >
        <input
          type="text"
          value={isEditing ? editText : item.name}
          onChange={(e) => setEditText(e.target.value)}
          disabled={!isEditing}
          readOnly={!isEditing}
          autoFocus={isEditing}
          className={`w-full rounded-lg px-3 py-2 transition
            ${
              isEditing
                ? "bg-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                : "bg-transparent border border-transparent text-gray-800 font-medium pointer-events-none select-none"
            }`}
          onKeyDown={(e) => {
            if (isEditing && e.key === "Enter") itemUpdate(item.id);
            if (isEditing && e.key === "Escape") handleCancelEdit();
          }}
        />
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => itemUpdate(item.id)}
            className="px-3 py-1 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-3 py-1 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => itemDelete(item.id)}
          className="px-3 py-1 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
        >
          Delete
        </button>
      )}
    </li>
  );
};
export default memo(ToDoItem);
