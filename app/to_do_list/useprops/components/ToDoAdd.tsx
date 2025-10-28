import { memo, useState } from "react";

// Dinh nghia kieu du lieu cua props onAdd cho components ToDoAdd
type AddFormProps = {
  onAdd(name: string): Promise<void> | void;
};

{
  /* Khu vực thêm việc cần làm */
}
const ToDoAdd = memo(function ToDoAdd({ onAdd }: AddFormProps) {
  const [item, setItem] = useState("");
  const handleAdd = async () => {
    const todoItem = item.trim();
    if (!todoItem) return;
    await onAdd(todoItem);
    setItem("");
  };
  
  console.log(`${item} added!`);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thêm việc cần làm
      </p>
      <div className="flex">
        <input
          type="text"
          value={item}
          onChange={(elements) => setItem(elements.target.value)}
          placeholder="Nhập việc cần làm..."
          className="flex-1 border-2 border-amber-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="ml-3 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
});
export default ToDoAdd;
