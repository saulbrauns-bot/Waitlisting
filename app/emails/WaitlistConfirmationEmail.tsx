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
 * Email template for waitlist confirmation
 * Sent immediately after signup to confirm joining the waitlist
 */
export default function WaitlistConfirmationEmail({
  firstName = "there",
  confirmUrl,
}: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You're on the Bridge waitlist! We'll email you when we launch in NYC.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Bridge branding */}
          <Heading style={h1}>Welcome to Bridge</Heading>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>
            You're officially on the waitlist! 🎉
          </Text>

          <Text style={text}>
            We're building something special for busy NYC professionals who want real connections
            without the endless swiping. You'll be among the first to know when we launch.
          </Text>

          {/* Early Member Benefit Reminder */}
          <Section style={benefitBox}>
            <Heading style={h2}>Your Early Member Reward</Heading>
            <Text style={benefitText}>
              <strong>12 months of Bridge at no cost</strong>
            </Text>
            <Text style={text}>
              As one of our first 2,500 members, you'll get a full year of Bridge for free.
              We'll email you when it's time to claim your reward.
            </Text>
          </Section>

          {/* What's Next */}
          <Section style={section}>
            <Heading style={h3}>What's next?</Heading>
            <Text style={text}>
              1. We'll email you when Bridge launches in NYC in 2026
              <br />
              2. You'll get early access to claim your 12-month reward
              <br />
              3. Start meeting other busy professionals who get it
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
            You're receiving this because you joined the Bridge waitlist.
            We'll only email you about your launch access and benefits.
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
  color: "#4a90e2",
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
  backgroundColor: "#4a90e2",
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
  border: "2px solid #4a90e2",
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
