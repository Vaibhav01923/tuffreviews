"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { getAlbums } from "@/functions/supabaseFunctions";
import { LoadMoreTrigger } from "@/components/LoadMoreTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUERY_CONFIG, STATS_DATA } from "@/constants";
import { AlbumCard } from "@/components/album";
import Navbar from "@/components/Navbar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatsItem from "@/components/StatsItem";
import { ClickSpark } from "@/components/ui/click-spark";
import type { Album } from "@/types";

// Main application component
function Home() {
  // State for the background GIF URL
  const [gifUrl, setGifUrl] = useState("/hero.gif");

  // Fetch albums data with infinite scroll
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["albums"],
      queryFn: ({ pageParam }) => getAlbums({ pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: QUERY_CONFIG.STALE_TIME,
    });

  // Combine all pages of albums into one array
  const albums = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages]
  );

  // Set up GIF URL with cache-busting timestamp
  useEffect(() => {
    setGifUrl(`/hero.gif?t=${performance.now()}`);
  }, []);

  // Function to load more albums when scrolling
  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage]);

  // Show loading skeleton while initial data is loading
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ClickSpark sparkColor="#fbbf24" />
      
      {/* Hero Section with animated GIF background */}
      <section
        className="relative py-20 overflow-hidden"
        aria-label="Hero section"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={gifUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            key={gifUrl}
            style={{ objectPosition: 'center 65%' }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              {"Made By a HipHop Head with Passion ❤️ "}
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Fuck Bitchfork or Any other so called critique who ragebaits us,
              Only place on the Internet with structured authentic reviews of
              your favoruite albums
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS_DATA.map((stat) => (
                <StatsItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-500" />
              </div>
              <Input
                type="text"
                placeholder="Search for albums, artists, or genres..."
                className="pl-12 pr-32 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-xl placeholder:text-gray-600 focus:ring-4 focus:ring-white/20 text-gray-900"
                disabled
                aria-label="Search"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Button
                  size="lg"
                  className="rounded-lg px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  disabled
                >
                  Search
                </Button>
              </div>
            </div>
            <p className="text-center text-muted-foreground text-sm mt-3">
              🔍 Search functionality coming soon!
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <Navbar />

      {/* Album Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {albums.map((album: Album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>

        {/* Load More Trigger */}
        {hasNextPage && (
          <div className="mt-12 flex justify-center">
            <LoadMoreTrigger onVisible={handleLoadMore} />
          </div>
        )}

        {/* Loading More Indicator */}
        {isFetchingNextPage && (
          <div
            className="mt-8 flex justify-center"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 text-muted-foreground bg-card px-6 py-3 rounded-full shadow-lg border border-border">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="font-medium">Loading more albums...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
