import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  BUSINESS_LEGAL_NAME,
  EMAIL,
  HIC_LICENSE,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS_LEGAL_NAME} collects, uses, and protects information submitted through this website.`,
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const EFFECTIVE_DATE = "July 30, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header variant="home" />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <main className="flex-1">
        <section className="bg-paper">
          <Container narrow className="py-16 md:py-24">
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              LEGAL
            </p>
            <h1 className="mb-3 font-head text-[32px] font-bold leading-[1.12] text-text sm:text-[40px] 2xl:text-[52px]">
              Privacy Policy
            </h1>
            <p className="mb-12 font-body text-sm text-muted">
              Effective Date: {EFFECTIVE_DATE} &nbsp;|&nbsp; {EMAIL}
            </p>

            <div className="max-w-[70ch] font-body text-[16px] leading-[1.75] text-muted [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-head [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:first:mt-0 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-accent [&_a]:underline [&_strong]:text-text">
              <h2>1. Introduction</h2>
              <p>
                {BUSINESS_LEGAL_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and
                protect information when you visit our website, contact us
                directly, or find us through third-party platforms such as
                Google, Yelp, or Thumbtack.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Information you provide directly</strong> — when
                  you submit our contact form or reach out via Thumbtack,
                  Yelp, or Google, you may provide your name, phone number,
                  email address, and project address.
                </li>
                <li>
                  <strong>Automatically collected information</strong> — our
                  website may collect standard technical data such as IP
                  address, browser type, and pages visited through cookies
                  and analytics tools (e.g., Google Analytics).
                </li>
                <li>
                  <strong>Third-party platforms</strong> — when you contact
                  us through Thumbtack, Yelp, or Google Business Profile,
                  those platforms may collect and share your information
                  with us according to their own privacy policies.
                </li>
                <li>
                  <strong>Communications</strong> — if you contact us by
                  email or phone, we may retain records of that
                  communication.
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul>
                <li>Respond to your inquiries and provide estimates</li>
                <li>Schedule and perform contracted services</li>
                <li>Send project-related communications</li>
                <li>Improve our website and services</li>
                <li>Manage our profiles on Google, Yelp, and Thumbtack</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>
                We do NOT sell, rent, or share your personal information
                with third parties for marketing purposes.
              </p>

              <h2>4. Contact Form Data</h2>
              <p>
                Information submitted through our website contact form is
                used solely to respond to your inquiry and provide
                requested services. Your contact details will not be added
                to any marketing list without your explicit consent.
              </p>

              <h2>5. Third-Party Platforms</h2>
              <p>
                {BUSINESS_LEGAL_NAME} maintains profiles on Google Business,
                Yelp, and Thumbtack. When you contact us or leave a review
                on these platforms, your information is also subject to
                their respective privacy policies:
              </p>
              <ul>
                <li>
                  Google Privacy Policy:{" "}
                  <a href="https://policies.google.com/privacy">
                    policies.google.com/privacy
                  </a>
                </li>
                <li>
                  Yelp Privacy Policy:{" "}
                  <a href="https://www.yelp.com/privacy">yelp.com/privacy</a>
                </li>
                <li>
                  Thumbtack Privacy Policy:{" "}
                  <a href="https://www.thumbtack.com/privacy">
                    thumbtack.com/privacy
                  </a>
                </li>
              </ul>
              <p>
                We are not responsible for the privacy practices of these
                third-party platforms.
              </p>

              <h2>6. Cookies &amp; Analytics</h2>
              <p>
                Our website may use cookies to improve user experience and
                analyze traffic. We may use Google Analytics to understand
                how visitors use our site — this data is anonymized and does
                not identify individual users.
              </p>
              <p>
                By using our website, you consent to the use of cookies as
                described in this policy.
              </p>

              <h2>7. Data Security</h2>
              <p>
                We take reasonable measures to protect your personal
                information from unauthorized access, disclosure, or
                misuse. However, no internet transmission is 100% secure,
                and we cannot guarantee absolute security.
              </p>

              <h2>8. Data Retention</h2>
              <p>
                We retain client information for as long as necessary to
                provide services and comply with legal requirements
                (typically 7 years for business records). Contact form
                inquiries that do not result in a project are retained for
                up to 12 months.
              </p>

              <h2>9. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>
                  Request access to personal information we hold about you
                </li>
                <li>Request correction of inaccurate information</li>
                <li>
                  Request deletion of your information (subject to legal
                  retention requirements)
                </li>
                <li>Opt out of future communications at any time</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>

              <h2>10. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites
                including Google, Yelp, and Thumbtack. We are not
                responsible for the privacy practices of those sites.
              </p>

              <h2>11. Children&rsquo;s Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years
                of age. We do not knowingly collect personal information
                from children.
              </p>

              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time.
                Changes will be posted on this page with an updated
                effective date.
              </p>

              <h2>13. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please
                contact:
              </p>
              <p>
                {BUSINESS_LEGAL_NAME}
                <br />
                Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                Website: <a href={SITE_URL}>{SITE_URL}</a>
                <br />
                {HIC_LICENSE}
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer variant="home" />
    </>
  );
}
