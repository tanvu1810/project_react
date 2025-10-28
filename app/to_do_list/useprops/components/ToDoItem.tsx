import { memo } from "react";
import type { ToDo } from "../types/todos";
type ToDoItemProps = {
  item: ToDo;
  isEditing: boolean;
  editText?: string;
  onStartEdit(item: ToDo): void;
  onChangeEditText(text: string): void;
  onDeleteItem(id: string): void;
  onUpdateItem(id: string): void;
  onCancelEdit(): void;
};

const ToDoItem = ({
  item,
  isEditing,
  editText,
  onStartEdit,
  onChangeEditText,
  onUpdateItem,
  onDeleteItem,
  onCancelEdit,
}: ToDoItemProps) => {
  console.log(`Render item: ${item.id}`);
  return (
    <li className="flex justify-between items-center bg-purple-50 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-100 transition">
      <div
        className="flex-1 mr-3 cursor-text"
        onClick={() => !isEditing && onStartEdit(item)}
        title={!isEditing ? "Click để sửa" : ""}
      >
        <input
          type="text"
          value={isEditing ? editText : item.name}
          onChange={(e) => onChangeEditText(e.target.value)}
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
            if (isEditing && e.key === "Enter") onUpdateItem(item.id);
            if (isEditing && e.key === "Escape") onCancelEdit();
          }}
        />
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onUpdateItem(item.id)}
            className="px-3 py-1 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-3 py-1 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onDeleteItem(item.id)}
          className="px-3 py-1 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
        >
          Delete
        </button>
      )}
    </li>
  );
};
export default memo(ToDoItem);
