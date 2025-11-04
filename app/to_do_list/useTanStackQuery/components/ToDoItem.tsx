import React, { memo, useCallback, useState } from "react";
import type { ToDo } from "../types/todos";
import useTodos from "../hooks/useTodos";

type ToDoItemProps = {
  item: ToDo;
  isEditing: boolean;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
};

const ToDoItem = ({ item, isEditing, setEditingId }: ToDoItemProps) => {
  const [editText, setEditText] = useState("");

  const { updateMutation, deleteMutation } = useTodos();

  const handleUpdate = useCallback(
    async (id: string, name: string) => {
      await updateMutation.mutateAsync({ id, name });
    },
    [updateMutation]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteMutation.mutateAsync(id);
    },
    [deleteMutation]
  );

  const handleStartEdit = useCallback((item: ToDo) => {
    setEditingId(item.id);
    setEditText(item.name ?? "");
  }, []);

  // Huỷ sửa
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditText("");
  }, []);

  const handleConfirm = useCallback(async () => {
    const text = editText.trim();
    if (!text) return;
    await handleUpdate(item.id, text);
    setEditingId(null);
    setEditText("");
  }, [editText]);

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
            if (isEditing && e.key === "Enter") handleConfirm();
            if (isEditing && e.key === "Escape") handleCancelEdit();
          }}
        />
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleConfirm()}
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
          onClick={() => handleDelete(item.id)}
          className="px-3 py-1 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
        >
          Delete
        </button>
      )}
    </li>
  );
};
export default memo(ToDoItem);
