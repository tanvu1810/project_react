import { useState } from "react";

type AddFormProps = {
  onAdd(name: string): Promise<void> | void;
};

export default function AddForm({ onAdd }: AddFormProps) {
  const [value, setValue] = useState("");

  const handleAdd = async () => {
    const todo = value.trim();
    if (!todo) return;
    await onAdd(todo);
    setValue("");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thêm việc cần làm
      </p>
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
}
