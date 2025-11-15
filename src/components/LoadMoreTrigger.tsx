"use client";

import { useEffect, useRef } from "react";

export function LoadMoreTrigger({ onVisible }: { onVisible: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onVisible(); // triggers fetchNextPage()
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [onVisible]);

  return <div ref={ref} style={{ height: 1 }} />;
}
