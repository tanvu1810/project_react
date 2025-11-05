import { memo, useEffect } from "react";
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
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<TodoType>({
    resolver: zodResolver(todoSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    console.log("[ToDoAdd] mounted");
  }, []);

  const onSubmit = async (data: TodoType) => {
    console.log("[ToDoAdd] onSubmit called with:", data);
    const text = data.name.trim();
    await onAdd(text);
    reset({ name: "" });
  };

  const onError = (errs: unknown) => {
    console.log("[ToDoAdd] onError RHF:", errs);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-6">
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thêm việc cần làm
      </p>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <input
              type="text"
              {...register("name")}
              placeholder="Nhập việc cần làm..."
              className="w-full border-2 border-amber-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              aria-invalid={!!errors.name}
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
      {/* debug line
      <pre className="text-xs text-gray-500 mt-2">
        isSubmitting: {String(isSubmitting)} | isSubmitSuccessful:{" "}
        {String(isSubmitSuccessful)}
      </pre> */}
    </div>
  );
};

export default memo(ToDoAdd);
