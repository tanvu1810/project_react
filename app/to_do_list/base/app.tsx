import { useState, useEffect } from "react";

// Để tránh kieu any thì nên tạo kiểu dữ liệu riêng
type Todo = { id: string; name?: string };
// interface Todo {
//   id: string;
//   name?: string;
// }

const getId = (it: Todo) => String(it.id);

export function App() {
  const [listItem, setList] = useState<Todo[]>([]);
  const [item, setItem] = useState("");

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const URL = "https://training-iota-azure.vercel.app/api/task";
      try {
        const response = await fetch(`${URL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        // setList(jsonData);
        setList(Array.isArray(jsonData) ? jsonData : (jsonData.data ?? []));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Mảng rỗng nghĩa là chỉ chạy một lần khi component mount

  // Them item
  const addItem = async () => {
    const todo = item.trim();
    const URL = "https://training-iota-azure.vercel.app/api/task";
    if (!todo) return;
    try {
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: todo }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`POST failed: ${response.status} ${text}`);
      }
      const data = await response.json();
      // Them item vua tao vao danh sach todoList
      setList((prevList) => [...prevList, data]);

      // Nếu trả về item vừa tạo:
      /*
      const created = Array.isArray(data) ? null : (data.data ?? data);
      if (created && !Array.isArray(created)) {
        setList((prevList) => [...prevList, created]);
      } else {
        // Nếu trả về cả danh sách
        setList(Array.isArray(data) ? data : (data.data ?? []));
      }
      */
      setItem("");
      console.log(`Item ${item} added successfully.`);
    } catch (error) {
      console.error("Error addt item: ", error);
      alert("Them that bai!");
    }
  };

  // Xoa item
  const delItem = async (id: string) => {
    const URL = "https://training-iota-azure.vercel.app/api/task";
    try {
      const response = await fetch(`${URL}?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`DELETE failed: ${response.status}`);
      console.log(`Item ${id} deleted successfully.`);
      setList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Xoa that bai!");
    }
  };

  // Sua khi nhan vao text
  const startEdit = (item: Todo) => {
    setEditingId(item.id);
    setEditText(item.name ?? "");
  };

  // Huỷ sửa
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Sua item
  const updateItem = async (id: string) => {
    const todo = editText.trim();
    const URL = "https://training-iota-azure.vercel.app/api/task";
    if (!todo) return;
    try {
      const response = await fetch(`${URL}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: todo }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`PUT failed: ${response.status} ${text}`);
      }

      setList((preList) =>
        preList.map((it) =>
          String(it.id) === String(id) ? { ...it, name: todo } : it
        )
      );

      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Sua that bai", error);
      alert("Sua that bai!");
    }
  };
  // const addItem = () => {
  //   if (item.trim() !== "") {
  //     const newItem = {
  //       // id: Math.floor(Math.random()),
  //       name: item.trim(),
  //     };
  //     setList((preList) => [...preList, newItem]);
  //     setItem("");
  //   }
  // };

  // const delItem = (index) => {
  //   setList((preList) => [preList.filter((item) => item.id !== id)]);
  // };
  console.log(listItem);
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
        {/* Tiêu đề chính */}
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6 drop-shadow-md">
          📝 ToDoList
        </h2>

        {/* Khu vực thêm việc cần làm */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Thêm việc cần làm
          </p>
          <div className="flex">
            <input
              type="text"
              name="add"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Nhập việc cần làm..."
              className="flex-1 border-2 border-amber-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            />
            <button
              type="button"
              onClick={addItem}
              className="ml-3 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              ➕ Add
            </button>
          </div>
        </div>

        {/* Danh sách việc cần làm */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-2xl font-bold text-center text-purple-700 mb-4">
            Danh sách công việc 📋
          </h3>

          {listItem.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              Chưa có việc nào 😴
            </p>
          ) : (
            <ul className="space-y-3">
              {listItem.map((it) => {
                const rowId = getId(it);
                const isEditing = String(editingId) === rowId;

                return (
                  <li
                    key={rowId}
                    className="flex justify-between items-center bg-purple-50 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-100 transition"
                  >
                    {/* Wrapper nhận click để bật edit */}
                    <div
                      className="flex-1 mr-3 cursor-text"
                      onClick={() => !isEditing && startEdit(it)}
                      title={!isEditing ? "Click để sửa" : ""}
                    >
                      <input
                        type="text"
                        value={isEditing ? editText : (it.name ?? "")}
                        onChange={(e) => setEditText(e.target.value)}
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        autoFocus={isEditing}
                        className={`w-full rounded-lg px-3 py-2 transition
              ${
                isEditing
                  ? "bg-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  : "bg-transparent border border-transparent text-gray-800 font-medium pointer-events-none select-none"
              }`}
                        onKeyDown={(e) => {
                          if (isEditing && e.key === "Enter") updateItem(it.id);
                          // if (isEditing && e.key === "Enter") updateItem(rowId);
                          if (isEditing && e.key === "Escape") cancelEdit();
                        }}
                      />
                    </div>

                    {/* Nút đổi Delete ↔ Update */}
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateItem(rowId)}
                          // onClick={() => updateItem(String(it.id))}
                          className="px-3 py-1 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-3 py-1 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => delItem(rowId)}
                        className="px-3 py-1 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
