"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Tables } from "../../database.types";

export type ReviewWithUser = Tables<"reviews"> & {
  profiles: {
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
};

type Album = Tables<"albums">;

interface AlbumPageUIProps {
  album: Album;
  reviews: ReviewWithUser[];
  onSubmitReview?: (rating: number, reviewText: string) => Promise<void>;
  isSubmitting?: boolean;
  isVerifiedUser?: boolean; // <-- NEW
}

export default function AlbumPageUI({
  album,
  reviews,
  onSubmitReview,
  isSubmitting = false,
  isVerifiedUser = false, // <-- NEW
}: AlbumPageUIProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    review_text: "",
  });

  const handleSubmitReview = async () => {
    if (!onSubmitReview) return;

    try {
      await onSubmitReview(
        newReview.rating,
        isVerifiedUser ? newReview.review_text : "" // guest cannot send text
      );

      toast.success("Your review has been successfully submitted!");

      setShowReviewForm(false);
      setNewReview({ rating: 5, review_text: "" });
    } catch (err: any) {
      if (err.message === "ALREADY_REVIEWED") {
        toast.error(
          "You've already reviewed this album. Only one review per album is allowed."
        );
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  const handleWriteReview = () => setShowReviewForm(!showReviewForm);

  // Format genres
  const formatGenres = (genres: any) => {
    if (!genres) return ["Unknown"];
    if (Array.isArray(genres))
      return genres.map((g) =>
        typeof g === "string" ? g : JSON.stringify(g).replace(/['"]/g, "")
      );
    try {
      const parsed = JSON.parse(genres);
      return Array.isArray(parsed) ? parsed : [String(genres)];
    } catch {
      return [String(genres)];
    }
  };

  const genres = formatGenres(album.genres);
  const averageRating = album.verified_rating || album.unverified_rating;
  const ratingCount =
    album.verified_rating_count || album.unverified_rating_count;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Albums
            </Button>
          </Link>
        </div>
      </header>

      {/* Album Header */}
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Album Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                {album.cover_url ? (
                  <img
                    src={album.cover_url}
                    alt={album.title}
                    className="rounded-2xl shadow-2xl w-full max-w-sm lg:max-w-md object-cover transition-transform group-hover:scale-105"
                    style={{ aspectRatio: "1" }}
                  />
                ) : (
                  <div
                    className="rounded-2xl shadow-2xl w-full max-w-sm lg:max-w-md bg-muted flex items-center justify-center"
                    style={{ aspectRatio: "1" }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2 opacity-50">🎵</div>
                      <p className="text-muted-foreground">No Cover</p>
                    </div>
                  </div>
                )}

                {/* Year */}
                {album.year && (
                  <Badge className="absolute top-4 right-4 bg-black/60 text-white border-0">
                    {album.year}
                  </Badge>
                )}
              </div>
            </div>

            {/* Album Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {album.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-2">
                  by {album.artist}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-6">
                {averageRating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(averageRating)
                              ? "fill-yellow-400"
                              : i < averageRating
                              ? "fill-yellow-400/50"
                              : "fill-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium text-foreground">
                      {averageRating.toFixed(1)}
                    </span>
                    {ratingCount && ratingCount > 0 && (
                      <span className="text-sm text-muted-foreground">
                        ({ratingCount}{" "}
                        {ratingCount === 1 ? "review" : "reviews"})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Album Description
                </h3>
                <p className="text-muted-foreground italic">
                  No description available yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Reviews ({reviews?.length || 0})
          </h2>

          <Button onClick={handleWriteReview}>
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <Card className="bg-card mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Write Your Review</h3>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Rating */}
              <div>
                <Label>Rating</Label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-6 w-6 cursor-pointer transition-colors ${
                        rating <= newReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted-foreground hover:text-yellow-200"
                      }`}
                      onClick={() => setNewReview({ ...newReview, rating })}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {newReview.rating} out of 5
                  </span>
                </div>
              </div>

              {/* Text Review — ONLY VERIFIERS */}
              {isVerifiedUser && (
                <div>
                  <Label>Your Review</Label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newReview.review_text}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        review_text: e.target.value,
                      })
                    }
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitReview} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} className="bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    {/* User */}
                    <div className="flex items-center gap-3">
                      {review.profiles?.avatar_url ? (
                        <img
                          src={review.profiles.avatar_url}
                          alt={`${review.profiles.first_name ?? ""} ${review.profiles.last_name ?? ""}`.trim() || "User"}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-foreground">
                          {review.profiles
                            ? `${review.profiles.first_name ?? ""} ${
                                review.profiles.last_name ?? ""
                              }`.trim() || "Verified User"
                            : "Guest User"}
                        </div>

                        {!review.profiles && (
                          <div className="text-sm text-muted-foreground">
                            Guest Reviewer
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (review.rating || 0)
                              ? "fill-yellow-400"
                              : "fill-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {review.review_text && (
                    <p className="text-foreground mb-3">{review.review_text}</p>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {review.is_verified ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-green-600/20 text-green-400 border-green-600/30"
                        >
                          ✓ Verified Review
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Community Review
                        </Badge>
                      )}
                    </span>

                    <span>
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : "Unknown date"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-muted-foreground mb-4">
                  No reviews yet. Be the first to review this album!
                </div>
                <Button onClick={handleWriteReview}>Write a Review</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
