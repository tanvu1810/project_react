import { useState, useEffect } from "react";
export function App() {
  const [listItem, setList] = useState<any[]>([]);
  const [item, setItem] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://training-iota-azure.vercel.app/api/task"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setList(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Mảng rỗng nghĩa là chỉ chạy một lần khi component mount

  // Them item
  const addItem = async () => {
    if (!item.trim()) return;
    try {
      const response = await fetch(
        "https://training-iota-azure.vercel.app/api/task",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: item.trim() }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`POST failed: ${response.status} ${text}`);
      }
      const data = await response.json();

      // Nếu trả về item vừa tạo:
      const created = Array.isArray(data) ? null : (data.data ?? data);
      if (created && !Array.isArray(created)) {
        setList((prev) => [...prev, created]);
      } else {
        // Nếu trả về cả danh sách
        setList(Array.isArray(data) ? data : (data.data ?? []));
      }
      setItem("");
      console.log(`Item ${item} added successfully.`);
    } catch (error) {
      console.error(error);
      alert("Them that bai ");
    }
  };

  // Xoa item
  const delItem = async (id: number | string) => {
    try {
      const response = await fetch(
        `https://training-iota-azure.vercel.app/api/task?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error(`DELETE failed: ${response.status}`);
      console.log(`Item ${id} deleted successfully.`);
      setList((prev) => prev.filter((item) => (item.id ?? item._id) !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Sua item
  const updateItem = async (id: string | number) => {
    if (!item.trim()) return;
    try {
      const response = await fetch(
        `https://training-iota-azure.vercel.app/api/task?id=${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editText }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`PUT failed: ${response.status} ${text}`);
      }
      setList((preList) =>
        preList.map((item) => {
          item.id === id ? { ...item, name: editText } : item;
        })
      );

      setEditText("");
    } catch (error) {
      console.error(error);
      alert("Sua that bai ");
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
              {listItem.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-purple-50 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-100 transition"
                  >
                    <span className="text-gray-800 font-medium">
                      {item.name ?? JSON.stringify(item)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        delItem(item.id);
                      }}
                      className="border border-red-500 text-white bg-orange-400 hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      disabled={item}
                      onClick={() => {
                        updateItem(item.id);
                      }}
                      className="border border-orange-500 text-white bg-blue-400 hover:bg-green-500 px-3 py-1 rounded-lg text-sm font-semibold transition"
                    >
                      Update
                    </button>
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
