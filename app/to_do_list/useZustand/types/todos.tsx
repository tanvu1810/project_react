import { create } from "zustand";
export interface ToDo {
  id: string;
  name: string;
}

interface ToDoStore {
  items: ToDo[];
  todo: ToDo | null;
  editText: string;
  isEditing: boolean;
  // editingId: string | number | null;
  // setEditingId: (id: string) => void;
  setTodo: (todo: ToDo | null) => void;
  setIsEditing: (value: boolean) => void;

  onStartEdit: (todo: ToDo) => void;
  onChangeEditText: (text: string) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (id: string) => void;
  onCancelEdit: () => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  items: [],
  todo: null,
  editText: "",
  isEditing: false,

  setTodo: (todo) => set({ todo }),
  setIsEditing: (value) => set({ isEditing: value }),

  //  Khi người dùng bấm "Sửa"
  onStartEdit: (todo) => set({ todo, editText: todo.name, isEditing: true }),

  //  Khi người dùng nhập text
  onChangeEditText: (text) => set({ editText: text }),

  //  Khi người dùng bấm "Xóa"
  onDeleteItem: (id) => {
    const filtered = get().items.filter((item) => item.id !== String(id));
    set({ items: filtered });
  },

  //  Khi người dùng bấm "Cập nhật"
  onUpdateItem: (id) => {
    const { items, editText } = get();
    const updated = items.map((item) =>
      item.id === String(id) ? { ...item, name: editText } : item
    );
    set({ items: updated, isEditing: false, todo: null, editText: "" });
  },

  //  Khi người dùng bấm "Hủy"
  onCancelEdit: () => set({ isEditing: false, todo: null, editText: "" }),
}));
