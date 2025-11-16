"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAlbumByID,
  getReviewsForAlbum,
  submitReview,
} from "@/functions/supabaseFunctions";
import AlbumPageUI, { ReviewWithUser } from "@/components/AlbumPageUI";
import { Album } from "@/types";
import { useAuth } from "@clerk/nextjs";

export default function AlbumPage() {
  const { id } = useParams();
  const albumId = Number(id);

  const { userId } = useAuth();

  const [album, setAlbum] = useState<Album | null>(null);
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load album + reviews
  useEffect(() => {
    async function load() {
      const [albumData, reviewsData] = await Promise.all([
        getAlbumByID(albumId),
        getReviewsForAlbum(albumId),
      ]);

      setAlbum(albumData);
      setReviews(reviewsData);
    }

    load();
  }, [albumId]);

  // 2. Handle review submit
  async function handleSubmitReview(rating: number, reviewText: string) {
    try {
      setIsSubmitting(true);

      
      await submitReview({
        albumId,
        rating,
        reviewText: reviewText || null,
        clerkUserId: userId ?? null,
      });

      // reload reviews after submitting
      const updatedReviews = await getReviewsForAlbum(albumId);
      setReviews(updatedReviews);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!album) return <div>Loading...</div>;

  return (
    <AlbumPageUI
      album={album}
      reviews={reviews}
      onSubmitReview={handleSubmitReview}
      isSubmitting={isSubmitting}
      isVerifiedUser={!!userId}
    />
  );
}
