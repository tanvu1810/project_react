import * as z from "zod";

export const todoSchema = z.object({
  name: z
    .string()
    .min(1, "Tên công việc không được để trống !")
    .max(20, "Không nhập quá 20 kí tự !"),
});

export type TodoType = z.infer<typeof todoSchema>;
