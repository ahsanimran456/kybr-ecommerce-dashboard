import { getStatusColor } from "@/lib/utils";

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(status)}`}
    >
      {status.replace(/-/g, " ")}
    </span>
  );
}
