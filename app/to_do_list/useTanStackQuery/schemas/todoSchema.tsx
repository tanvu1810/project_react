import * as z from "zod";

export const todoSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Tên công việc không được để trống !")
    .max(10, "Không nhập quá 10 kí tự !"),
});

export type TodoType = z.infer<typeof todoSchema>;
