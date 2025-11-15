import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FALLBACK_SVG, GENRE_DISPLAY_LIMIT } from "@/constants";
import type { AlbumCardProps } from "@/types";

// Component to display a single album card
function AlbumCard({ album }: AlbumCardProps) {
  // Handle image loading errors by showing fallback SVG
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_SVG;
  };

  // Process genres for display
  let genres: string[] = [];
  if (Array.isArray(album.genres)) {
    genres = (album.genres as string[]).slice(0, GENRE_DISPLAY_LIMIT);
  }

  // Check if there are more genres than we're showing
  const hasMoreGenres = Array.isArray(album.genres) && (album.genres as string[]).length > GENRE_DISPLAY_LIMIT;
  const totalGenres = Array.isArray(album.genres) ? (album.genres as string[]).length : 0;

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-md bg-card"
      role="article"
      tabIndex={0}
      aria-label={`Album: ${album.title} by ${album.artist}`}
    >
      {/* Album Cover */}
      <div className="relative overflow-hidden bg-muted">
        <div className="aspect-square">
          {album.cover_url ? (
            <img
              src={album.cover_url}
              alt={`${album.title} cover`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-muted to-secondary/20">
              <div className="text-center">
                <div className="text-6xl mb-2 opacity-50" aria-hidden="true">🎵</div>
                <p className="text-muted-foreground text-sm font-medium">No Cover</p>
              </div>
            </div>
          )}
        </div>
        {album.year && (
          <Badge className="absolute top-2 right-2 bg-black/60 text-white border-0">
            {album.year}
          </Badge>
        )}
      </div>

      {/* Album Information */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1 group-hover:text-primary transition-colors">
          {album.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-3">{album.artist}</p>

        {/* Ratings */}
        <div className="space-y-2">
          {album.verified_rating && (
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-400 border-green-600/30">
                ✓ Verified
              </Badge>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500" aria-hidden="true">★</span>
                <span className="text-sm font-medium">{album.verified_rating.toFixed(1)}</span>
              </div>
            </div>
          )}

          {album.unverified_rating && (
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">Community</Badge>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500" aria-hidden="true">★</span>
                <span className="text-sm font-medium">{album.unverified_rating.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {genres.map((genre, index) => (
              <Badge key={`${album.id}-genre-${index}`} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
            {hasMoreGenres && (
              <Badge variant="outline" className="text-xs">
                +{totalGenres - GENRE_DISPLAY_LIMIT}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AlbumCard;