import { type Employee } from "@shared/schema";
import { Building2, DollarSign, Mail, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useDeleteEmployee } from "@/hooks/use-employees";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onEdit }: EmployeeCardProps) {
  const [showDelete, setShowDelete] = useState(false);
  const deleteMutation = useDeleteEmployee();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const handleDelete = () => {
    deleteMutation.mutate(employee.id, {
      onSuccess: () => setShowDelete(false),
    });
  };

  return (
    <>
      <div 
        className="
          group relative bg-card rounded-2xl p-6
          border border-border/50
          shadow-lg shadow-black/[0.02]
          hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1 hover:border-border
          transition-all duration-300 ease-out
        "
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
              {employee.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground font-medium">
              <Building2 className="w-3.5 h-3.5" />
              {employee.department}
            </div>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(employee)}
              className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              title="Edit Employee"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
              title="Deactivate Employee"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border/40">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
              <Mail className="w-4 h-4" />
            </div>
            <span className="truncate">{employee.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-full bg-green-500/5 flex items-center justify-center text-green-600">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="font-mono font-medium text-foreground/80">
              {formatter.format(employee.salary)}
            </span>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-6 right-6">
           <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
        </div>
      </div>

      <DeleteConfirmation
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
        employeeName={employee.name}
      />
    </>
  );
}
