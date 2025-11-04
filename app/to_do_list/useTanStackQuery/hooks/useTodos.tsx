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
    staleTime: 60_000,
    gcTime: 500_000,
    refetchOnWindowFocus: true,
  });

  // Add Item
  const addMutation = useMutation({
    mutationFn: (name: string) => addToDoItem(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Update Item
  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateToDoItem(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete Item
  const deleteMutation = useMutation({
    mutationFn: (id: string) => delToDoItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { todosQuery, addMutation, updateMutation, deleteMutation };
}
