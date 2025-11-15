// Import the Album type from our database types
import { Tables } from "../../database.types";

// Export the Album type so we can use it everywhere
export type Album = Tables<"albums">;

// Props for the rating display component
export type RenderRatingProps = {
  rating: number | null;
};

// Props for the stats item component
export type StatsItemProps = {
  value: string;
  label: string;
};

// Props for the album card component
export type AlbumCardProps = {
  album: Album;
};

// Props for the loading skeleton component
export type LoadingSkeletonProps = {
  count?: number;
};