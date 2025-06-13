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
  const [errorMessage, setErrorMessage] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 4000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or errorMessage change
    }
  }, [errorMessage]);

  const handleAddOrUpdate = async (employee: {
    _id?: string;
    name: string;
    start: string;
    end?: string;
  }) => {
    setLoading(true);
    setErrorMessage(""); // Reset error

    try {
      let res;
      if (employee._id) {
        res = await fetch(`/api/employees/${employee._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        });
        setEditingId(null);
      } else {
        res = await fetch("/api/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        });
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save data");
      }

      await fetchEmployees();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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

      {/* Top-Right Dropdown Menu with Enhanced Style */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 ease-in-out"
          >
            <span className="text-xl">☰</span> Menu
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-right scale-100">
              <div className="py-3 px-4">
                <div className="text-sm text-gray-600 mb-2 font-medium">
                  Navigation
                </div>

                <button
                  onClick={() => {
                    router.push("/employee-details");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-150"
                >
                  <span className="text-blue-600 text-lg">👤</span>
                  <span className="text-sm font-medium">Add Employee</span>
                </button>

                <button
                  onClick={() => {
                    router.push("/timesheet");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-800 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-150"
                >
                  <span className="text-purple-600 text-lg">📊</span>
                  <span className="text-sm font-medium">Timesheet Report</span>
                </button>
              </div>
            </div>
          )}
        </div>
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

        {errorMessage && (
          <div className="mb-4 px-4 py-3 rounded bg-red-100 border border-red-300 text-red-700 text-sm shadow">
            ⚠️ {errorMessage}
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
