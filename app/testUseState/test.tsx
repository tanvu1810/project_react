import { useState } from "react";
export function Test() {
  const [count, setCount] = useState(0);
  const increments = () => {
    setCount(count + 1);
  };
  const decrements = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="flex items-center justify-center  gap-4 bg-gray-100 p-5 rounded-xl w-fit mx-auto  border-amber-600 border-2 ">
        <button
          type="button"
          onClick={decrements}
          className="bg-red-500 text-white text-2xl w-10 h-10 rounded-md hover:bg-pink-500"
        >
          -
        </button>
        <p className="text-2xl font-bold text-purple-600">{count}</p>
        <button
          type="button"
          onClick={increments}
          className="bg-blue-500 text-white text-2xl w-10 h-10 rounded-md hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
