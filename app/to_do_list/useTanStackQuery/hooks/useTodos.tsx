import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToDoItem,
  delToDoItem,
  fetchData,
  updateToDoItem,
} from "../api/api";
export default function Todos() {
  const queryClient = useQueryClient();
  // Doc du lieu
  const todosQuery = useQuery({
    queryKey: ["todos"],

    // initialData:
    queryFn: fetchData,
    gcTime: 1000 * 60 * 1,
  });

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

  return { todosQuery, addItem, updateItem, deleteItem };
}
