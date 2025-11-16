import { supabase } from "@/supabase-client";

export async function getProfileId(clerkId: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", clerkId)
    .single();

  return profile?.id ?? null;
}
