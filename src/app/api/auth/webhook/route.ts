import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../../database.types";

// SERVICE ROLE CLIENT (Full DB access)
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!, // MUST be service role key
  {
    auth: { persistSession: false },
  }
);

/**
 * Extract email reliably from Clerk webhooks.
 */
function extractEmail(data: any): string | null {
  const primary = data.email_addresses?.find(
    (e: any) => e.id === data.primary_email_address_id
  );
  if (primary?.email_address) return primary.email_address;
  if (data.email_address) return data.email_address;
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    console.log(`Clerk webhook received: ${evt.type} (id=${evt.data?.id})`);

    switch (evt.type) {
      case "user.created":
        await handleUserCreated(evt.data);
        break;

      case "user.updated":
        await handleUserUpdated(evt.data);
        break;

      case "user.deleted":
        await handleUserDeleted(evt.data);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

/* ----------------------------------------------------
   USER CREATED
----------------------------------------------------- */
async function handleUserCreated(data: any) {
  const clerkId = data.id; // TEXT id from Clerk
  const email = extractEmail(data);
  const first = data.first_name || null;
  const last = data.last_name || null;
  const avatar = data.image_url || null;

  // 1️⃣ Upsert into PROFILES (public user profile data)
  const { error: profileErr } = await supabaseAdmin.from("profiles").upsert({
    id: clerkId, // TEXT PK
    email,
    first_name: first,
    last_name: last,
    avatar_url: avatar,
  });

  if (profileErr) {
    console.error("Failed to upsert profiles:", profileErr);
    throw profileErr;
  }

  // 2️⃣ Upsert into USERS (your business logic user table)
  const { error: userErr } = await supabaseAdmin.from("users").upsert({
    clerk_user_id: clerkId,
    email,
    first_name: first,
    last_name: last,
    additional_context: data.username || null,
  });

  if (userErr) {
    console.error("Failed to upsert users:", userErr);
    throw userErr;
  }

  console.log("✅ User created in Supabase:", clerkId);
}

/* ----------------------------------------------------
   USER UPDATED
----------------------------------------------------- */
async function handleUserUpdated(data: any) {
  const clerkId = data.id;
  const email = extractEmail(data);
  const first = data.first_name || null;
  const last = data.last_name || null;
  const avatar = data.image_url || null;

  await supabaseAdmin
    .from("profiles")
    .update({
      email,
      first_name: first,
      last_name: last,
      avatar_url: avatar,
    })
    .eq("id", clerkId);

  await supabaseAdmin
    .from("users")
    .update({
      email,
      first_name: first,
      last_name: last,
      additional_context: data.username || null,
      modified_at: new Date().toISOString(),
    })
    .eq("clerk_user_id", clerkId);

  console.log("🔄 User updated:", clerkId);
}

/* ----------------------------------------------------
   USER DELETED
----------------------------------------------------- */
async function handleUserDeleted(data: any) {
  const clerkId = data.id;

  await supabaseAdmin.from("users").delete().eq("clerk_user_id", clerkId);
  await supabaseAdmin.from("profiles").delete().eq("id", clerkId);

  console.log("🗑️ User deleted:", clerkId);
}
