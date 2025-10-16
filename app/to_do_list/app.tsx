import { useState, useEffect } from "react";
export function App() {
  const [listItem, setList] = useState([]);
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://training-iota-azure.vercel.app/api/task"
        ); // Thay bằng URL API của bạn
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setList(jsonData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Mảng rỗng nghĩa là chỉ chạy một lần khi component mount

  return (
    <>
      <div className="flex justify-center h-100 items-center">
        <div>
          <h2>ToDoList</h2>
          <div>
            <p>Them viec can lam</p>
            <input
              type="text"
              name="add"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              placeholder="Nhap viec can lam!"
              className="border-2 border-amber-600"
            />
            <button type="submit" className="border-2 border-b-blue-500 m-2">
              Add
            </button>
          </div>
          <div>
            <p>Danh sach cac viec can lam:</p>
            <ul>
              {listItem.map((item, index) => (
                <li key={item}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
