import { useTodoStore } from "../store/todo_store";

export default function AddForm() {
  const addInput = useTodoStore((s) => s.addInput);
  const setAddInput = useTodoStore((s) => s.setAddInput);
  const add = useTodoStore((s) => s.add);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thêm việc cần làm
      </p>
      <div className="flex">
        <input
          type="text"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          placeholder="Nhập việc cần làm..."
          className="flex-1 border-2 border-amber-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
        <button
          type="button"
          onClick={add}
          className="ml-3 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
}
