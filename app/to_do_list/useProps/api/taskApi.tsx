import type { Todo } from "../types/todo";
const BASE_URL = "https://training-iota-azure.vercel.app/api/task";

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const json = await response.json();
  return Array.isArray(json) ? json : (json.data ?? []);
}

export async function createTodo(name: string): Promise<Todo | Todo[]> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok)
    throw new Error(`POST failed: ${response.status} ${await response.text()}`);
  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}?id=${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`DELETE failed: ${response.status}`);
}

export async function updateTodo(
  id: string | number,
  name: string
): Promise<void> {
  const response = await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name }),
  });
  if (!response.ok)
    throw new Error(`PUT failed: ${response.status} ${await response.text()}`);
}
