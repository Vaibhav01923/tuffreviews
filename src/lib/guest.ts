// /lib/guest.ts

// Generate a random guest ID (UUID-like)
function generateGuestId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2) + Date.now();
}

export function getOrCreateGuestId(): string {
  // Avoid SSR errors
  if (typeof window === "undefined") return "server-guest";

  const KEY = "guest_review_id";

  let existing = localStorage.getItem(KEY);

  if (existing && existing.length > 0) {
    return existing;
  }

  // Create new guest ID
  const newGuestId = generateGuestId();
  localStorage.setItem(KEY, newGuestId);

  return newGuestId;
}
