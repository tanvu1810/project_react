import { fetchData, addToDoItem, updateToDoItem, delToDoItem } from "./api/api";

import Header from "./components/Headers";
import ToDoAdd from "./components/ToDoAdd";
import ToDoList from "./components/ToDoList";
import Title from "./components/Title";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function HomePage() {
  const queryClient = useQueryClient();
  // Doc du lieu
  const {
    data: list = [],
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["todos"], queryFn: fetchData });

  // Add Item
  const addItem = useMutation({
    mutationFn: (name: string) => addToDoItem(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Update Item
  const updateItem = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateToDoItem(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete Item
  const deleteItem = useMutation({
    mutationFn: (id: string) => delToDoItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = async (name: string) => {
    await addItem.mutateAsync(name);
  };

  const handleUpdate = async (id: string, name: string) => {
    await updateItem.mutateAsync({ id, name });
  };
  const handleDelete = async (id: string) => {
    await deleteItem.mutateAsync(id);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <Header title="📝 ToDoList" />

      <ToDoAdd onAdd={handleAdd} />

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <Title paragraph="Danh sách công việc 📋" />
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">
            Lỗi: {(error as Error).message ?? "Something went wrong"}
          </p>
        ) : (
          <ToDoList
            list={list}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
