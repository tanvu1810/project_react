import { getId, type ToDo } from "../types/todos";
import ToDoItem from "./ToDoItem";
type ToDoListProps = {
  items: ToDo[];
  editingId: string | number | null;
  editText: string;
  onStartEdit(todo: ToDo): void;
  onChangeEditText(text: string): void;
  onDeleteItem(id: string): void;
  onUpdateItem(id: string): void;
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
      {items.map((it, index) => (
        <ToDoItem
          key={`${getId(it)}-${index}`}
          todo={it}
          isEditing={String(editingId) === getId(it)}
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
