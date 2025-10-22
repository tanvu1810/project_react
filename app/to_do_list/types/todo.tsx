export type Todo = { id: string | number; name?: string };
export const getId = (it: Todo) => String(it.id);
export const normalizeId = (id: string | number) => String(id);
