"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WaitlistConfirmation from "@/app/components/confirmation/WaitlistConfirmation";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const firstName = searchParams.get("firstName") || undefined;
  const email = searchParams.get("email") || undefined;
  const refCode = searchParams.get("refCode") || undefined;

  return (
    <WaitlistConfirmation
      firstName={firstName}
      email={email}
      refCode={refCode}
    />
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-bridge-text-secondary">Loading...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
