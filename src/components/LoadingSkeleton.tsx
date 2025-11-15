import { Card, CardContent } from "@/components/ui/card";
import { LOADING_SKELETON_COUNT } from "@/constants";
import type { LoadingSkeletonProps } from "@/types";

// Loading skeleton component - shows placeholder cards while data is loading
function LoadingSkeleton({ count = LOADING_SKELETON_COUNT }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={`skeleton-${index}`} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-md bg-card">
          {/* Album Cover Skeleton */}
          <div className="relative overflow-hidden bg-muted">
            <div className="aspect-square bg-muted animate-pulse" />
            {/* Year Badge Skeleton */}
            <div className="absolute top-2 right-2 h-6 w-12 bg-muted/60 rounded-full animate-pulse" />
          </div>

          {/* Album Information Skeleton */}
          <CardContent className="p-4">
            <div className="h-5 bg-muted rounded animate-pulse w-3/4 mb-1" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2 mb-3" />

            {/* Rating Skeletons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-5 w-16 bg-green-600/20 rounded-full animate-pulse" />
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 bg-yellow-500 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 bg-yellow-500 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Genre Badges Skeleton */}
            <div className="mt-3 flex flex-wrap gap-1">
              <div className="h-5 w-16 bg-secondary rounded-full animate-pulse" />
              <div className="h-5 w-20 bg-secondary rounded-full animate-pulse" />
              <div className="h-5 w-12 bg-muted rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default LoadingSkeleton;