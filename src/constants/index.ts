// How many skeleton loading cards to show
export const LOADING_SKELETON_COUNT = 10;

// Maximum number of genres to show on album cards
export const GENRE_DISPLAY_LIMIT = 2;

// SVG image to show when album cover fails to load
export const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23D1D5DB' font-family='Arial, sans-serif' font-size='24'%3ENo Cover%3C/text%3E%3C/svg%3E`;

// Available filter genres
export const FILTER_GENRES = ["Rock", "Pop", "Jazz", "Electronic", "Hip Hop"];

// Stats data for the hero section
export const STATS_DATA = [
  { value: "1K+", label: "Albums" },
  { value: "500+", label: "Artists" },
  { value: "50+", label: "Genres" },
  { value: "10K+", label: "Reviews" },
];

// Query cache time (5 minutes in milliseconds)
export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
};