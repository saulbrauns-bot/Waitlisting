/**
 * Tests for referral link generation and sharing utilities
 */

import {
  generateReferralLink,
  generateSMSMessage,
  generateEmailParams,
} from "../referral";

describe("Referral Utilities", () => {
  describe("generateReferralLink", () => {
    it("should generate link with refCode", () => {
      const link = generateReferralLink({ refCode: "SARAH2024" });
      expect(link).toBe("https://bridge.app/waitlist?ref=SARAH2024");
    });

    it("should generate base link without refCode", () => {
      const link = generateReferralLink({});
      expect(link).toBe("https://bridge.app/waitlist");
    });

    it("should handle undefined refCode", () => {
      const link = generateReferralLink({ refCode: undefined });
      expect(link).toBe("https://bridge.app/waitlist");
    });
  });

  describe("generateSMSMessage", () => {
    it("should include refCode in SMS message", () => {
      const message = generateSMSMessage("JOHN2024");
      expect(message).toContain("https://bridge.app/waitlist?ref=JOHN2024");
      expect(message).toContain("busy NYC professionals");
    });

    it("should work without refCode", () => {
      const message = generateSMSMessage();
      expect(message).toContain("https://bridge.app/waitlist");
      expect(message).not.toContain("?ref=");
    });
  });

  describe("generateEmailParams", () => {
    it("should generate email with refCode", () => {
      const { subject, body } = generateEmailParams("JANE2024");
      expect(subject).toBe("Join Bridge with me");
      expect(body).toContain("https://bridge.app/waitlist?ref=JANE2024");
      expect(body).toContain("busy professionals in NYC");
    });

    it("should work without refCode", () => {
      const { subject, body } = generateEmailParams();
      expect(subject).toBe("Join Bridge with me");
      expect(body).toContain("https://bridge.app/waitlist");
      expect(body).not.toContain("?ref=");
    });
  });
});
