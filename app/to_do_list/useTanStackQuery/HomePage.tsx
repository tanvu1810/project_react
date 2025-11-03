import Header from "./components/Headers";
import ToDoAdd from "./components/ToDoAdd";
import ToDoList from "./components/ToDoList";
import Title from "./components/Title";
import useTodos from "./hooks/useTodos";

export default function HomePage() {
  const { todosQuery, addItem, updateItem, deleteItem } = useTodos();
  const handleAdd = async (name: string) => {
    await addItem.mutateAsync(name);
  };

  const list = todosQuery.data ?? [];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Header title="📝 ToDoList" />

      <ToDoAdd onAdd={handleAdd} />

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <Title paragraph="Danh sách công việc 📋" />
        {todosQuery.isLoading ? (
          <p>Loading...</p>
        ) : todosQuery.isError ? (
          <p className="text-red-500">
            Lỗi: {(todosQuery.error as Error).message ?? "Something went wrong"}
          </p>
        ) : (
          <ToDoList list={list} />
        )}
      </div>
    </div>
  );
}
