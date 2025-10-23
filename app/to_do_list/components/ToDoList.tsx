import { normalizeId, type ToDo } from "../types/todos";
import ToDoItem from "./ToDoItem";
type ToDoListProps = {
  items: ToDo[];
  editingId: string | number | null;
  editText: string;
  onStartEdit(todo: ToDo): void;
  onChangeEditText(text: string): void;
  onDeleteItem(id: string | number): void;
  onUpdateItem(id: string | number): void;
  onCancelEdit(): void;
};

export default function ToDoList({
  items,
  editingId,
  editText,
  onStartEdit,
  onChangeEditText,
  onUpdateItem,
  onDeleteItem,
  onCancelEdit,
}: ToDoListProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">Chưa có việc nào 😴</p>
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <ToDoItem
          key={normalizeId(it.id)}
          todo={it}
          isEditing={normalizeId(editingId ?? "") === normalizeId(it.id)}
          editText={editText}
          onStartEdit={onStartEdit}
          onChangeEditText={onChangeEditText}
          onUpdateItem={onUpdateItem}
          onCancelEdit={onCancelEdit}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
}
