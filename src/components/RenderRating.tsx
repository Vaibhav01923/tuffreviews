import type { RenderRatingProps } from "@/types";

// Component to display album rating with stars
function RenderRating({ rating }: RenderRatingProps) {
  // If no rating, don't show anything
  if (!rating) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-500" aria-hidden="true">★</span>
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default RenderRating;