import type { StatsItemProps } from "@/types";

// Component to display a single stat item (like "1K+ Albums")
function StatsItem({ value, label }: StatsItemProps) {
  return (
    <div className="group">
      <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
        {value}
      </div>
      <div className="text-gray-300 text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default StatsItem;