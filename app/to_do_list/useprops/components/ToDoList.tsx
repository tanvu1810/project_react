import { type ToDo } from "../types/todos";
import ToDoItem from "./ToDoItem";
import React, { memo, useState, type SetStateAction } from "react";

type ToDoListProps = {
  list: ToDo[];
  setList: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const ToDoList = ({ list, setList }: ToDoListProps) => {
  const [editingId, setEditingId] = useState<string | number | null>(null);

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
            setEditingId={setEditingId}
            setList={setList}
          />
        );
      })}
    </ul>
  );
};

export default memo(ToDoList);
