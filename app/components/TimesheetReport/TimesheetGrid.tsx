export default function TimesheetGrid({
  data,
}: {
  data: { name: string; start: string; end?: string }[];
}) {
  if (data.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4">
        No records found for the selected date.
      </p>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <div className="grid grid-cols-3 font-semibold text-indigo-600 border-b pb-2 mb-2">
        <span>Name</span>
        <span>Check-in</span>
        <span>Check-out</span>
      </div>
      {data.map((record, idx) => (
        <div key={idx} className="grid grid-cols-3 py-2 border-b last:border-0">
          <span>{record.name}</span>
          <span>{record.start}</span>
          <span>{record.end || "-"}</span>
        </div>
      ))}
    </div>
  );
}
