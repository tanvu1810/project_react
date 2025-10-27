import { type ToDo } from "../types/todos";
import ToDoItem from "./ToDoItem";
import React from "react";
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

const ToDoList = ({
  items,
  editingId,
  editText,
  onStartEdit,
  onChangeEditText,
  onUpdateItem,
  onDeleteItem,
  onCancelEdit,
}: ToDoListProps) => {
  console.log(`${items}`);
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">Chưa có việc nào 😴</p>
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          todo={item}
          isEditing={String(editingId) === item.id}
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
};

export default React.memo(ToDoList);
