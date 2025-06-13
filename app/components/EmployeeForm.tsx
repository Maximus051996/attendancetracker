"use client";
import { useEffect, useState } from "react";

type Props = {
  onSubmit: (employee: {
    _id?: string;
    name: string;
    start: string;
    end: string;
  }) => void;
  initialData: {
    _id?: string;
    name: string;
    start: string;
    end?: string;
  } | null;
  isEdit: boolean;
};

export default function EmployeeForm({ onSubmit, initialData, isEdit }: Props) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStart(initialData.start);
      setEnd(initialData.end ?? "");
      setError("");
    } else {
      setName("");
      setStart("");
      setEnd("");
      setError("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && start >= end) {
      setError("Start time must be earlier than end time.");
      return;
    }

    if (!name || !start || (isEdit && !end)) {
      setError("All fields are required.");
      return;
    }

    onSubmit({
      _id: initialData?._id,
      name,
      start,
      end: isEdit ? end : "",
    });

    setName("");
    setStart("");
    setEnd("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-xl mb-6 space-y-4"
    >
      <div>
        <label className="block font-medium mb-1">Employee Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="e.g. John Doe"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {isEdit && (
          <div className="flex-1">
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border p-2 rounded"
              required={isEdit}
            />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {initialData ? "Check Out" : "Check In"}
      </button>
    </form>
  );
}
