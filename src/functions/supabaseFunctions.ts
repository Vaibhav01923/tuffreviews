import { supabase } from "@/supabase-client";
import { Tables } from "../../database.types";
import { getRange } from "@/utils/paginate";
import { ReviewWithUser } from "@/components/AlbumPageUI";
import { getOrCreateGuestId } from "@/lib/guest";
import { getProfileId } from "@/lib/getProfileId";

type Album = Tables<"albums">;

export async function getAlbums({
  pageParam,
  search,
}: {
  pageParam: number;
  search: string;
}): Promise<{
  data: Album[];
  currentPage: number;
  nextPage: number | null;
}> {
  const LIMIT = 50;
  const [from, to] = getRange(pageParam, LIMIT);

  let query = supabase.from("albums").select("*", { count: "exact" });
  if (search && search.trim() !== "") {
    query = query.ilike("search_text", `%${search}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error || !data) {
    console.error("Error fetching albums:", error);
    return {
      data: [],
      currentPage: pageParam,
      nextPage: null,
    };
  }

  const total = count ?? 0;

  const nextPage = (pageParam + 1) * LIMIT >= total ? null : pageParam + 1;
  return {
    data: data,
    currentPage: pageParam,
    nextPage,
  };
}

export async function getAlbumByID(id: number) {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getReviewsForAlbum(albumId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      profiles (
        email,
        first_name,
        last_name,
        avatar_url
      )
    `
    )
    .eq("album_id", albumId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function submitReview({
  albumId,
  rating,
  reviewText,
  clerkUserId, // null for guest
}: {
  albumId: number;
  rating: number;
  reviewText: string | null;
  clerkUserId: string | null;
}) {
  let user_id: string | null = null;
  let guest_identifier: string | null = null;

  // ----------------------------------------
  // 1️⃣ If logged in → Verified reviewer
  // ----------------------------------------
  if (clerkUserId) {
    user_id = await getProfileId(clerkUserId);

    if (!user_id) {
      throw new Error("NO_PROFILE");
    }

    // Prevent verified users from reviewing twice
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("album_id", albumId)
      .eq("user_id", user_id)
      .single();

    if (existing) throw new Error("ALREADY_REVIEWED");
  }

  // ----------------------------------------
  // 2️⃣ If guest → Only rating allowed
  // ----------------------------------------
  if (!clerkUserId) {
    guest_identifier = getOrCreateGuestId();

    // Prevent the SAME guest from rating again
    const { data: existingGuest } = await supabase
      .from("reviews")
      .select("id")
      .eq("album_id", albumId)
      .eq("guest_identifier", guest_identifier)
      .single();

    if (existingGuest) throw new Error("ALREADY_REVIEWED");

    // Guests cannot write text reviews
    reviewText = null;
  }

  // ----------------------------------------
  // 3️⃣ Insert review
  // ----------------------------------------
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      album_id: albumId,
      rating,
      review_text: reviewText,
      user_id,
      guest_identifier,
      is_verified: clerkUserId ? true : false,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
