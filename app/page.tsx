"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

type Employee = {
  _id: string;
  name: string;
  start: string;
  end?: string;
};

export default function HomePage() {
  const router = useRouter(); // ✅ Router initialized

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await fetch("/api/employees");
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
    start: string;
    end?: string;
  }) => {
    setLoading(true);

    if (employee._id) {
      await fetch(`/api/employees/${employee._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      setEditingId(null);
    } else {
      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
    }

    await fetchEmployees();
    setLoading(false);
  };

  const handleDelete = async (_id: string) => {
    setLoading(true);
    await fetch(`/api/employees/${_id}`, { method: "DELETE" });
    await fetchEmployees();
    setLoading(false);
  };

  const handleEdit = (_id: string) => {
    setEditingId(_id);
  };

  const currentEmployee = employees.find((e) => e._id === editingId) || null;

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      {/* Top-Left Company Name */}
      <div className="mb-4">
        <div className="inline-block px-4 py-2 rounded-3xl shadow-md bg-white/80 backdrop-blur-md border border-blue-200 ml-4">
          <h2 className="text-2xl font-bold text-blue-900">New Maa Durga</h2>
        </div>
      </div>

      {/* Top-Right Timesheet Report Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => router.push("/timesheet")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition font-semibold"
        >
          Timesheet Report
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Employee Time Tracker
        </h1>

        {loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-700 font-medium animate-pulse">
              Fetching data...
            </span>
          </div>
        )}

        <EmployeeForm
          onSubmit={handleAddOrUpdate}
          initialData={currentEmployee}
          isEdit={editingId !== null}
        />

        <h2 className="text-xl font-semibold text-gray-700 mt-10 mb-4">
          Today&apos;s Attendance
        </h2>

        <EmployeeList
          data={employees}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}
