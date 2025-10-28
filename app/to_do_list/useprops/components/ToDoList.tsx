import { type ToDo } from "../types/todos";
import ToDoItem from "./ToDoItem";
import { memo } from "react";
type ToDoListProps = {
  list: ToDo[];
  editingId: string | number | null;
  editText?: string;
  onStartEdit(todo: ToDo): void;
  onChangeEditText(text: string): void;
  onDeleteItem(id: string): void;
  onUpdateItem(id: string): void;
  onCancelEdit(): void;
};

const ToDoList = ({
  list,
  editingId,
  editText,
  onStartEdit,
  onChangeEditText,
  onUpdateItem,
  onDeleteItem,
  onCancelEdit,
}: ToDoListProps) => {
  console.log(`Object: ${list.length}`);
  if (list.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">Chưa có việc nào 😴</p>
    );
  }
  return (
    <ul className="space-y-3">
      {list.map((item) => {
        const isEditing = editingId === item.id;
        return (
          <ToDoItem
            key={item.id}
            item={item}
            isEditing={isEditing}
            editText={isEditing ? editText : undefined}
            onStartEdit={onStartEdit}
            onChangeEditText={onChangeEditText}
            onUpdateItem={onUpdateItem}
            onCancelEdit={onCancelEdit}
            onDeleteItem={onDeleteItem}
          />
        );
      })}
    </ul>
  );
};

export default memo(ToDoList);
