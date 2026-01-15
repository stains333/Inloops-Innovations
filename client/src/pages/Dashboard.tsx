import { useState } from "react";
import { useEmployees, useCreateEmployee, useUpdateEmployee } from "@/hooks/use-employees";
import { EmployeeCard } from "@/components/EmployeeCard";
import { Modal } from "@/components/Modal";
import { EmployeeForm } from "@/components/EmployeeForm";
import { type Employee, type InsertEmployee } from "@shared/schema";
import { Loader2, Plus, Users, Search, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { data: employees, isLoading, error } = useEmployees();
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees?.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (data: InsertEmployee) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  const handleUpdate = (data: InsertEmployee) => {
    if (!editingEmployee) return;
    updateMutation.mutate({ id: editingEmployee.id, ...data }, {
      onSuccess: () => setEditingEmployee(null),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Section */}
      <div className="bg-white border-b border-border/50 sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Team Overview
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your active workforce and departments
              </p>
            </div>
            
            <button
              onClick={() => setIsCreateOpen(true)}
              className="
                flex items-center justify-center gap-2 
                px-6 py-3 rounded-xl font-semibold 
                bg-foreground text-background 
                hover:bg-foreground/90 hover:scale-105
                active:scale-100
                shadow-lg shadow-black/10
                transition-all duration-200
              "
            >
              <Plus className="w-5 h-5" />
              Add Employee
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
            <p>Loading your team...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-destructive">
            <AlertCircle className="w-10 h-10 mb-4" />
            <p className="font-medium">Failed to load employees</p>
            <p className="text-sm opacity-80 mt-1">Please try refreshing the page</p>
          </div>
        ) : filteredEmployees?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-muted-foreground border-2 border-dashed border-border rounded-3xl bg-white/50">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">No employees found</h3>
            <p className="mt-2 max-w-sm text-center">
              {searchQuery 
                ? "Try adjusting your search terms to find who you're looking for."
                : "Get started by adding your first employee to the system."}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="mt-6 text-primary font-semibold hover:underline"
              >
                Create your first employee
              </button>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredEmployees?.map((employee) => (
                <motion.div
                  key={employee.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <EmployeeCard 
                    employee={employee} 
                    onEdit={setEditingEmployee}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Employee"
        description="Enter the details below to onboard a new team member."
      >
        <EmployeeForm
          onSubmit={handleCreate}
          isPending={createMutation.isPending}
          submitLabel="Create Employee"
        />
      </Modal>

      <Modal
        isOpen={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        title="Edit Employee"
        description="Update the employee's information below."
      >
        {editingEmployee && (
          <EmployeeForm
            defaultValues={editingEmployee}
            onSubmit={handleUpdate}
            isPending={updateMutation.isPending}
            submitLabel="Save Changes"
          />
        )}
      </Modal>
    </div>
  );
}
