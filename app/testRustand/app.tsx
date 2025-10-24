// App.jsx
import useCounterStore from "./store";

export function Caculator() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <>
      <h2>Count: {count}</h2>
      <button
        onClick={() => {
          increment(count);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          decrement(count);
        }}
      >
        -
      </button>
    </>
  );
}
