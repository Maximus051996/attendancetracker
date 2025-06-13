"use client";

type Props = {
  data: { _id: string; name: string }[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function EmployeeMasterList({ data, onDelete, onEdit }: Props) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-semibold tracking-wide">
              Employee Name
            </th>
            <th className="px-6 py-3 text-sm font-semibold tracking-wide text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((emp, idx) => (
            <tr
              key={emp._id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-indigo-50 transition`}
            >
              <td className="px-6 py-3 text-gray-800 text-sm">{emp.name}</td>
              <td className="px-6 py-3 flex justify-center gap-3">
                <button
                  onClick={() => onEdit(emp._id)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(emp._id)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={2}
                className="px-6 py-4 text-center text-gray-500 text-sm bg-white"
              >
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
