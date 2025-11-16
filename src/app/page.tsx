"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { getAlbums } from "@/functions/supabaseFunctions";
import { LoadMoreTrigger } from "@/components/LoadMoreTrigger";
import { Input } from "@/components/ui/input";
import { QUERY_CONFIG, STATS_DATA } from "@/constants";
import { AlbumCard } from "@/components/album";
import Navbar from "@/components/Navbar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatsItem from "@/components/StatsItem";
import { ClickSpark } from "@/components/ui/click-spark";
import TextType from "@/components/ui/text-type";
import type { Album } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Main application component
function Home() {
  // State for the background GIF URL
  const [gifUrl, setGifUrl] = useState("/hero.gif");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // Ref to preserve scroll position during state changes
  const scrollPositionRef = useRef<number>(0);

  // Fetch albums data with infinite scroll
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["albums", debouncedQuery],
      queryFn: ({ pageParam }) =>
        getAlbums({ pageParam: pageParam, search: debouncedQuery }),
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

  // Preserve scroll position during loading state changes
  useEffect(() => {
    if (isLoading) {
      scrollPositionRef.current = window.scrollY;
    } else {
      // Only restore if we had a previous scroll position
      if (scrollPositionRef.current > 0) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background relative">
      <div style={{ zIndex: 5 }}>
        <ClickSpark sparkColor="#fbbf24" />
      </div>

      {/* Hero Section with animated GIF background */}
      <section
        className="relative py-20 overflow-hidden z-20"
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
            style={{ objectPosition: "center 65%" }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Made By a HipHop Head
              <TextType
                text={["with Love ❤️", "with passion", "for the culture"]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={1500}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                className={"ml-2 text-red-500"}
                cursorClassName="text-white"
                textColors={["#ff1a1a", "#ffeb3b", "#ff9800"]}
              />
            </h2>

            {/* Quick Stats */}
            <div className="font-bold text-[17px] text-white/60 ">
              <span className="text-red-500/80 drop-shadow-xl underline">
                Fuck Bitchfork
              </span>
              , We dont rely on ragebiat for views
              <div>
                <span className="underline">ONLY</span> PLACE ON THE INTERNET
                FOR AUTHENTIC AND REAL REVIEWS
              </div>
              <div>
                This is where Real Art gets Recognition,{" "}
                <span className="underline">
                  <span className="font-extrabold">Click</span> on an album to
                  start giving reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="bg-card/50 backdrop-blur-sm border-b border-border relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 dark:text-white text-black" />
              </div>
              <Input
                type="text"
                placeholder="Search for albums, artists, or genres..."
                className="pl-12 pr-32 py-4 text-lg dark:text-white bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-xl placeholder:text-gray-600 focus:ring-4 focus:ring-white/20 text-gray-900"
                aria-label="Search"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <Navbar />

      {/* Album Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isLoading ? (
            <LoadingSkeleton count={10} />
          ) : (
            albums.map((album: Album) => (
              <Link
                key={album.id}
                href={`/albums/${album.id}`}
                className="block"
              >
                <AlbumCard album={album} />
              </Link>
            ))
          )}
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
