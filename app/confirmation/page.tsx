"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function ConfirmationRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Redirect old confirmation URLs to new general confirmation page
    // Preserve query params for backwards compatibility
    const params = new URLSearchParams();

    // Map old firstName param to new name param
    const firstName = searchParams.get("firstName");
    if (firstName) params.set("name", firstName);

    const email = searchParams.get("email");
    if (email) params.set("email", email);

    const refCode = searchParams.get("refCode");
    if (refCode) params.set("refCode", refCode);

    // Also support new name param directly
    const name = searchParams.get("name");
    if (name) params.set("name", name);

    router.replace(`/confirmation/general?${params.toString()}`);
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-bridge-text-secondary">Redirecting...</p>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-bridge-text-secondary">Loading...</p>
      </div>
    }>
      <ConfirmationRedirect />
    </Suspense>
  );
}
