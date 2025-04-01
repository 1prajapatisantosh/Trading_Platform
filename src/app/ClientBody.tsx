"use client";

import { useEffect, useState } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  // Wait for client-side hydration to complete
  useEffect(() => {
    setIsMounted(true);
    // Remove any extension-added classes during hydration
    document.body.className = "antialiased";
  }, []);

  // Prevent hydration errors by not rendering on first render
  if (!isMounted) {
    return null;
  }

  return (
    <div className="antialiased" suppressHydrationWarning>
      {children}
    </div>
  );
}
