import { create } from "zustand";
import type { Todo } from "~/to_do_list/useProps/types/todo";
import { normalizeId } from "~/to_do_list/useProps/types/todo";

import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "~/to_do_list/useProps/api/taskApi";

type State = {
  items: Todo[];
  // UI state cho flow edit (giữ nguyên như code gốc)
  editingId: string | number | null;
  editText: string;
  // ô input “Thêm việc”
  addInput: string;
  loading: boolean;
};

type Actions = {
  setAddInput(v: string): void;
  setEditText(v: string): void;
  startEdit(todo: Todo): void;
  cancelEdit(): void;

  load(): Promise<void>;
  add(): Promise<void>;
  remove(id: string | number): Promise<void>;
  confirmEdit(): Promise<void>;
};

export const useTodoStore = create<State & Actions>((set, get) => ({
  items: [],
  editingId: null,
  editText: "",
  addInput: "",
  loading: false,

  setAddInput: (v) => set({ addInput: v }),
  setEditText: (v) => set({ editText: v }),

  startEdit: (todo) => set({ editingId: todo.id, editText: todo.name ?? "" }),
  cancelEdit: () => set({ editingId: null, editText: "" }),

  // GET list
  load: async () => {
    set({ loading: true });
    try {
      const data = await fetchTodos();
      set({ items: data });
    } finally {
      set({ loading: false });
    }
  },

  // POST (giữ logic cũ: API có thể trả 1 item hoặc danh sách)
  add: async () => {
    const name = get().addInput.trim();
    if (!name) return;
    try {
      const data = await createTodo(name);
      const created = Array.isArray(data)
        ? null
        : ((data as any)?.data ?? data);
      if (created && !Array.isArray(created)) {
        set((s) => ({ items: [...s.items, created], addInput: "" }));
      } else {
        set({
          items: Array.isArray(data) ? data : ((data as any)?.data ?? []),
          addInput: "",
        });
      }
      console.log(`Item "${name}" added successfully.`);
    } catch (e) {
      console.error("Add failed:", e);
      alert("Thêm thất bại!");
    }
  },

  // DELETE
  remove: async (id) => {
    try {
      await deleteTodo(String(id));
      set((s) => ({
        items: s.items.filter((x) => normalizeId(x.id) !== normalizeId(id)),
      }));
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Xoá thất bại!");
    }
  },

  // PUT
  confirmEdit: async () => {
    const { editingId, editText, items } = get();
    const name = editText.trim();
    if (!editingId || !name) return;

    try {
      await updateTodo(editingId, name);
      const nid = normalizeId(editingId);
      const next = items.map((t) =>
        normalizeId(t.id) === nid ? { ...t, name } : t
      );
      set({ items: next, editingId: null, editText: "" });
    } catch (e) {
      console.error("Update failed:", e);
      alert("Sửa thất bại!");
    }
  },
}));
