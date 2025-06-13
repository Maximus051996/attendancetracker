export default function EmployeeList({
  data,
  onDelete,
  onEdit,
}: {
  data: { _id: string; name: string; start: string; end?: string }[];
  onDelete: (_id: string) => void;
  onEdit: (_id: string) => void;
}) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <svg
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
          />
        </svg>
        <p className="text-lg font-medium">No entries yet.</p>
        <p className="text-sm text-gray-400">
          Start tracking by adding an employee entry.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((emp) => (
        <div
          key={emp._id}
          className="grid grid-cols-1 sm:grid-cols-3 items-center bg-white border border-gray-200 p-4 rounded-xl shadow hover:shadow-md transition"
        >
          <div className="col-span-2">
            <p className="font-semibold text-lg text-gray-800">{emp.name}</p>
            <p className="text-sm text-gray-600">
              {emp.start} - {emp.end || "Not Checked Out"}
            </p>
          </div>
          <div className="flex justify-start sm:justify-end gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => onEdit(emp._id)}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(emp._id)}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
