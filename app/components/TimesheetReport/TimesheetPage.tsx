"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "../TimesheetReport/DatePicker";
import TimesheetGrid from "../TimesheetReport/TimesheetGrid";

export default function TimesheetPage() {
  const router = useRouter();
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async (selectedDate: string) => {
    setLoading(true);
    const res = await fetch(`/api/timesheet?date=${selectedDate}`);
    const data = await res.json();
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords(date);
  }, [date]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800">Timesheet Report</h1>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>

      <DatePicker value={date} onChange={setDate} />
      {loading ? (
        <p className="text-gray-500 mt-4">Loading records...</p>
      ) : (
        <TimesheetGrid data={records} />
      )}
    </div>
  );
}
