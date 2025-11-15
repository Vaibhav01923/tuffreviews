import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FILTER_GENRES } from "@/constants";

// Component to display filter genre badges (currently disabled)
function FilterBadges() {
  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-foreground">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {FILTER_GENRES.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="px-3 py-1 opacity-50 cursor-not-allowed"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="sm" disabled>
            Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterBadges;