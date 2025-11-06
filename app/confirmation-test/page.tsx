"use client";

import React, { useState } from "react";
import WaitlistConfirmation from "@/app/components/confirmation/WaitlistConfirmation";
import { Button } from "@/components/ui/button";

/**
 * Test page for WaitlistConfirmation component
 * Allows switching between different data scenarios
 */
export default function ConfirmationTestPage() {
  const [scenario, setScenario] = useState<
    "complete" | "no-firstname" | "no-email" | "no-refcode"
  >("complete");

  const scenarios = {
    complete: {
      firstName: "Sarah",
      email: "sarah@example.com",
      refCode: "SARAH2024",
      label: "Complete data",
    },
    "no-firstname": {
      email: "anonymous@example.com",
      refCode: "ANON2024",
      label: "Missing firstName",
    },
    "no-email": {
      firstName: "John",
      refCode: "JOHN2024",
      label: "Missing email",
    },
    "no-refcode": {
      firstName: "Jane",
      email: "jane@example.com",
      label: "Missing refCode",
    },
  };

  const currentScenario = scenarios[scenario];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scenario Switcher */}
      <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4 space-y-2">
        <h2 className="font-semibold text-sm mb-2">Test Scenarios:</h2>
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
          <Button
            key={key}
            variant={scenario === key ? "default" : "outline"}
            size="sm"
            onClick={() => setScenario(key)}
            className="w-full"
          >
            {scenarios[key].label}
          </Button>
        ))}
      </div>

      {/* Confirmation Component */}
      <WaitlistConfirmation
        firstName={"firstName" in currentScenario ? currentScenario.firstName : undefined}
        email={"email" in currentScenario ? currentScenario.email : undefined}
        refCode={"refCode" in currentScenario ? currentScenario.refCode : undefined}
      />
    </div>
  );
}
