import type { Todo } from "../types/todo";
import { normalizeId } from "../types/todo";
import TodoItem from "./ItemToDo";

type TodoListProps = {
  items: Todo[];
  editingId: string | number | null;
  editText: string;
  onStartEdit(todo: Todo): void;
  onChangeEditText(text: string): void;
  onConfirmEdit(id: string | number): void;
  onCancelEdit(): void;
  onDelete(id: string | number): void;
};

export default function TodoList({
  items,
  editingId,
  editText,
  onStartEdit,
  onChangeEditText,
  onConfirmEdit,
  onCancelEdit,
  onDelete,
}: TodoListProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">Chưa có việc nào 😴</p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <TodoItem
          key={normalizeId(it.id)}
          todo={it}
          isEditing={normalizeId(editingId ?? "") === normalizeId(it.id)}
          editText={editText}
          onStartEdit={onStartEdit}
          onChangeEditText={onChangeEditText}
          onConfirmEdit={onConfirmEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
