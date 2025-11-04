import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type TodoType } from "../schemas/todoSchema";

type AddFormProps = {
  onAdd(name: string): Promise<void> | void;
};

const ToDoAdd = ({ onAdd }: AddFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TodoType>({
    resolver: zodResolver(todoSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: TodoType) => {
    const name = data.name.trim();
    if (!name) return;
    await onAdd(name);
    reset(); // clear form sau khi add
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thêm việc cần làm
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nhập việc cần làm..."
              className="w-full border-2 border-amber-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-60 transition"
          >
            ➕ Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(ToDoAdd);
