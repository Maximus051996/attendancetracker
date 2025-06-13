"use client";

import { useState, useEffect } from "react";

type Props = {
  onSubmit: (employee: { _id?: string; name: string }) => void;
  initialData: { _id?: string; name: string } | null;
  isEdit: boolean;
};

export default function EmployeeMasterForm({
  onSubmit,
  initialData,
  isEdit,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) setName(initialData.name);
    else setName("");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onSubmit({ _id: initialData?._id, name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Employee Name"
        className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all"
      >
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
