import { supabase } from "@/supabase-client";
import { Tables } from "../../database.types";
import { getRange } from "@/utils/paginate";

type Album = Tables<"albums">;

export async function getAlbums({ pageParam }: { pageParam: number }): Promise<{
  data: Album[];
  currentPage: number;
  nextPage: number | null;
}> {
  const LIMIT = 50;
  const [from, to] = getRange(pageParam, LIMIT);

  const { data, error, count } = await supabase
    .from("albums")
    .select("*", { count: "exact" })
    .range(from, to);

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
