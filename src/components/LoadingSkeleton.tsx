import { Card, CardContent } from "@/components/ui/card";
import { LOADING_SKELETON_COUNT } from "@/constants";
import type { LoadingSkeletonProps } from "@/types";

// Loading skeleton component - shows placeholder cards while data is loading
function LoadingSkeleton({ count = LOADING_SKELETON_COUNT }: LoadingSkeletonProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-1/2 mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;