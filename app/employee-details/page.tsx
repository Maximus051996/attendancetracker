"use client";

import { useEffect, useState } from "react";
import EmployeeMasterForm from "@/app/components/employeedetails/EmployeeMasterForm";
import EmployeeMasterList from "@/app/components/employeedetails/EmployeeMasterList";
import { useRouter } from "next/navigation";

type Employee = {
  _id: string;
  name: string;
};

export default function EmployeeMasterPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await fetch("/api/employee-master");
    const data = await res.json();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddOrUpdate = async (employee: {
    _id?: string;
    name: string;
  }) => {
    setLoading(true);
    const method = employee._id ? "PUT" : "POST";
    const url = employee._id
      ? `/api/employee-master/${employee._id}`
      : "/api/employee-master";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });

    setEditingId(null);
    await fetchEmployees();
    setLoading(false);
  };

  const handleDelete = async (_id: string) => {
    setLoading(true);
    await fetch(`/api/employee-master/${_id}`, { method: "DELETE" });
    await fetchEmployees();
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const currentEmployee = employees.find((e) => e._id === editingId) || null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <span className="text-xl transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span className="text-sm sm:text-base">Back to Home</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Employee Details
        </h1>

        {loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
            <span className="ml-3 text-indigo-700 font-medium animate-pulse">
              Loading...
            </span>
          </div>
        )}

        <EmployeeMasterForm
          onSubmit={handleAddOrUpdate}
          initialData={currentEmployee}
          isEdit={editingId !== null}
        />

        <EmployeeMasterList
          data={employees}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
