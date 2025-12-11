import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WaitlistConfirmationEmailProps {
  firstName?: string;
  confirmUrl?: string;
}

/**
 * Email template for interest confirmation
 * Sent immediately after signup to confirm interest in Bridge
 */
export default function WaitlistConfirmationEmail({
  firstName = "there",
  confirmUrl,
}: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for your interest in Bridge — the first community-driven dating experience.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Bridge branding */}
          <Heading style={h1}>Thanks for your interest!</Heading>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>
            We&apos;re excited you&apos;re interested in Bridge — the first community-driven dating experience.
          </Text>

          <Text style={text}>
            We&apos;re building something different: one curated match at a time, shaped by real community insight.
            No endless swiping. No noise. Just intentional connections.
          </Text>

          {/* Beta Launch Info */}
          <Section style={benefitBox}>
            <Heading style={h2}>Beta Launching at Rice</Heading>
            <Text style={benefitText}>
              <strong>February 28th, 2025</strong>
            </Text>
            <Text style={text}>
              We&apos;re starting our beta at Rice University. If you&apos;re a Rice student,
              stay tuned for more details as we get closer to launch.
            </Text>
          </Section>

          {/* What's Next */}
          <Section style={section}>
            <Heading style={h3}>What&apos;s next?</Heading>
            <Text style={text}>
              We&apos;ll keep you updated on our progress and let you know when Bridge
              is available in your area. In the meantime, feel free to share Bridge
              with friends who might be interested.
            </Text>
          </Section>

          {/* User Research Invitation */}
          <Section style={researchBox}>
            <Heading style={h3}>We&apos;d love to hear from you</Heading>
            <Text style={text}>
              We&apos;re building Bridge with real feedback from people like you. If you&apos;d be open to
              a quick chat about your thoughts on dating apps and what you&apos;re looking for,
              we&apos;d be incredibly grateful.
            </Text>
            <Text style={text}>
              Just reply to this email — no pressure at all!
            </Text>
          </Section>

          {/* Footer */}
          <Text style={footerText}>
            Questions? Just reply to this email.
            <br />
            <br />
            – The Bridge Team
          </Text>

          <Text style={smallText}>
            You&apos;re receiving this because you expressed interest in Bridge.
            We&apos;ll only send you important updates.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 30px",
  padding: "0",
  lineHeight: "1.3",
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 12px",
  padding: "0",
};

const h3 = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 12px",
  padding: "0",
};

const text = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const benefitText = {
  color: "#027BCE",
  fontSize: "18px",
  lineHeight: "1.6",
  margin: "0 0 12px",
  textAlign: "center" as const,
};

const smallText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 12px",
};

const buttonSection = {
  margin: "32px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#027BCE",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1",
  padding: "16px 32px",
  textDecoration: "none",
  textAlign: "center" as const,
};

const section = {
  margin: "32px 0",
  padding: "0",
};

const benefitBox = {
  backgroundColor: "#f0f7ff",
  border: "2px solid #027BCE",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const footerText = {
  color: "#4a5568",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "32px 0 16px",
};

const researchBox = {
  backgroundColor: "#fef9f3",
  border: "2px solid #ebd8b7",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};
