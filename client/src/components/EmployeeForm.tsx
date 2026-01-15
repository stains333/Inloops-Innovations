import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEmployeeSchema, type InsertEmployee } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface EmployeeFormProps {
  defaultValues?: Partial<InsertEmployee>;
  onSubmit: (data: InsertEmployee) => void;
  isPending: boolean;
  submitLabel?: string;
}

export function EmployeeForm({ defaultValues, onSubmit, isPending, submitLabel = "Save" }: EmployeeFormProps) {
  const form = useForm<InsertEmployee>({
    resolver: zodResolver(insertEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      salary: 0,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="text-sm font-medium text-foreground ml-1 mb-1.5 block">
            Full Name
          </label>
          <input
            {...form.register("name")}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:bg-background input-ring text-foreground placeholder:text-muted-foreground"
          />
          {form.formState.errors.name && (
            <p className="text-xs text-destructive mt-1.5 ml-1 font-medium">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="text-sm font-medium text-foreground ml-1 mb-1.5 block">
            Email Address
          </label>
          <input
            {...form.register("email")}
            type="email"
            placeholder="jane@company.com"
            className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:bg-background input-ring text-foreground placeholder:text-muted-foreground"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive mt-1.5 ml-1 font-medium">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department Field */}
          <div>
            <label className="text-sm font-medium text-foreground ml-1 mb-1.5 block">
              Department
            </label>
            <input
              {...form.register("department")}
              placeholder="Engineering"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:bg-background input-ring text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.department && (
              <p className="text-xs text-destructive mt-1.5 ml-1 font-medium">
                {form.formState.errors.department.message}
              </p>
            )}
          </div>

          {/* Salary Field */}
          <div>
            <label className="text-sm font-medium text-foreground ml-1 mb-1.5 block">
              Salary (USD)
            </label>
            <input
              type="number"
              {...form.register("salary", { valueAsNumber: true })}
              placeholder="85000"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:bg-background input-ring text-foreground placeholder:text-muted-foreground"
            />
            {form.formState.errors.salary && (
              <p className="text-xs text-destructive mt-1.5 ml-1 font-medium">
                {form.formState.errors.salary.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="
            relative overflow-hidden group
            px-8 py-3 rounded-xl font-semibold text-white
            bg-primary shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5
            active:translate-y-0 active:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            transition-all duration-200 ease-out
          "
        >
          <div className="relative z-10 flex items-center gap-2">
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Saving..." : submitLabel}
          </div>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </form>
  );
}
