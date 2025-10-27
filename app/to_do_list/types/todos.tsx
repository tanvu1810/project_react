export type ToDo = {
  id: string;
  name?: string;
};

export const getId = (item: ToDo) => String(item.id);
// export const normalizeId = (id: string | number) => String(id);
