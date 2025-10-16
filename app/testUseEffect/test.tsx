import { useState, useEffect } from "react";

export function Counter() {
  const [numbera, setNumbera] = useState(0);
  const [numberb, setNumberb] = useState(0);
  const [sum, setSum] = useState(0);
  const handleSum = () => {
    const a = numbera || 0;
    const b = numberb || 0;
    setSum(a + b);
  };

  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <div className=" items-center justify-center  gap-4 bg-gray-100 p-5 rounded-xl w-fit mx-auto  border-amber-600 border-2 ">
          <div className="m-2">
            <label>Input a:</label>
            <input
              type="number"
              name="a"
              value={numbera}
              onChange={(e) => {
                setNumbera(parseFloat(e.target.value));
              }}
              className="border-2"
            />
          </div>
          <div className="m-2">
            <label>Input b:</label>
            <input
              type="number"
              name="b"
              value={numberb}
              onChange={(e) => {
                setNumberb(parseFloat(e.target.value));
              }}
              className="border-2"
            />
          </div>
          <div className="m-2">
            <button type="button" onClick={handleSum}>
              Submit
            </button>

            <label className="border-2 border-amber-400">{sum}</label>
          </div>
        </div>
      </div>
    </>
  );
}
