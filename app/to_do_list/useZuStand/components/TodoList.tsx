import { useTodoStore } from "../store/todo_store";
import { normalizeId } from "~/to_do_list/useProps/types/todo";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const items = useTodoStore((s) => s.items);

  if (!items.length) {
    return (
      <p className="text-center text-gray-500 italic">Chưa có việc nào 😴</p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <TodoItem key={normalizeId(it.id)} todo={it} />
      ))}
    </ul>
  );
}
