"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SmsConsentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-bridge-text-muted hover:text-bridge-text-primary text-sm transition-colors underline">
          SMS Verification and Consent
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-bridge-text-primary">
            SMS Verification and Consent
          </DialogTitle>
          <DialogDescription className="font-body text-bridge-text-secondary pt-4 leading-relaxed">
            When creating an account in the Bridge mobile app, users enter their
            phone number and tap &ldquo;Continue&rdquo; to request a verification code.
            This action serves as explicit consent to receive a one-time SMS for
            authentication. Messaging is used only for verification. Reply STOP to
            opt out or HELP for assistance. Message and data rates may apply.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
