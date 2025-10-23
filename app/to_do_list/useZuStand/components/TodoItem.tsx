import type { Todo } from "~/to_do_list/useProps/types/todo";
import { useTodoStore } from "../store/todo_store";
import { normalizeId } from "~/to_do_list/useProps/types/todo";

type Props = { todo: Todo };

export default function TodoItem({ todo }: Props) {
  const editingId = useTodoStore((s) => s.editingId);
  const editText = useTodoStore((s) => s.editText);

  const startEdit = useTodoStore((s) => s.startEdit);
  const setEditText = useTodoStore((s) => s.setEditText);
  const confirmEdit = useTodoStore((s) => s.confirmEdit);
  const cancelEdit = useTodoStore((s) => s.cancelEdit);
  const remove = useTodoStore((s) => s.remove);

  const isEditing = normalizeId(editingId ?? "") === normalizeId(todo.id);

  return (
    <li className="flex justify-between items-center bg-purple-50 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-100 transition">
      <div
        className="flex-1 mr-3 cursor-text"
        onClick={() => !isEditing && startEdit(todo)}
        title={!isEditing ? "Click để sửa" : ""}
      >
        <input
          type="text"
          value={isEditing ? editText : (todo.name ?? "")}
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
            if (isEditing && e.key === "Enter") confirmEdit();
            if (isEditing && e.key === "Escape") cancelEdit();
          }}
        />
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={confirmEdit}
            className="px-3 py-1 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="px-3 py-1 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => remove(todo.id)}
          className="px-3 py-1 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
        >
          Delete
        </button>
      )}
    </li>
  );
}
