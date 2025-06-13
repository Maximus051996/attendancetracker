export default function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">Select Date</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded-lg shadow text-gray-700"
      />
    </div>
  );
}
