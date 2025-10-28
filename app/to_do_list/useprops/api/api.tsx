import type { ToDo } from "../types/todos";

const BASE_URL = "https://training-iota-azure.vercel.app/api/task";

// Fetch Data
// export async function fetchToDos(): Promise<ToDo[]> { }; //Function declaration
export const fetchData = async (): Promise<ToDo[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    console.log("Fetch data successfully: ", jsonData);
    return Array.isArray(jsonData) ? jsonData : (jsonData.data ?? []);
  } catch (error) {
    console.error("Error while fetch Data ToDo:", error);
    throw error;
  }
};

// Add ToDoItem
export const addToDoItem = async (name: string): Promise<ToDo> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(
        `POST failed: ${response.status}, ${await response.text}`
      );
    }
    console.log(`Item ${name} added successfully`);
    return response.json();
  } catch (error) {
    console.error("Error while adding ToDo item:", error);
    throw error;
  }
};

// Update ToDoItem
export const updateToDoItem = async (
  id: string,
  name: string
): Promise<void> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    if (!response.ok) {
      throw new Error(`PUT failed: ${response.status}, ${await response.text}`);
    }
    console.log(`Item ${id} updated successfully`);
  } catch (error) {
    console.error("Error while update ToDo item:", error);
    throw error;
  }
};

// Delete ToDoItem
export const delToDoItem = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`DELETE failed: ${response.status}`);
    }
    console.log(`Item ${id} deleted successfully`);
  } catch (error) {
    console.error("Error while update ToDo item:", error);
    throw error;
  }
};
