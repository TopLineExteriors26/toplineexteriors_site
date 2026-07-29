import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  BUSINESS_LEGAL_NAME,
  EMAIL,
  PHONE_DISPLAY,
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

const LAST_UPDATED = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

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
            <h1 className="mb-3 font-head text-[32px] font-bold leading-[1.12] text-text sm:text-[40px] md:text-[52px]">
              Privacy Policy
            </h1>
            <p className="mb-12 font-body text-sm text-muted">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="max-w-[70ch] font-body text-[16px] leading-[1.75] text-muted [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-head [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:first:mt-0 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-accent [&_a]:underline [&_strong]:text-text">
              <p>
                {BUSINESS_LEGAL_NAME} (&ldquo;TopLine Exteriors,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                respects your privacy. This Privacy Policy explains what
                information we collect through this website, how we use it,
                and the choices you have. By using this website, you agree
                to the practices described below.
              </p>

              <h2>Information We Collect</h2>
              <p>We collect information in the following ways:</p>
              <ul>
                <li>
                  <strong>Information you provide directly</strong> — when
                  you submit an estimate request or contact form, we collect
                  your name, phone number, email address, property address,
                  and any project details you share with us.
                </li>
                <li>
                  <strong>Automatic technical information</strong> — like
                  most websites, our hosting and security infrastructure may
                  automatically log basic technical data such as IP address,
                  browser type, and pages visited, for security and site
                  performance purposes.
                </li>
                <li>
                  <strong>Cookies and analytics</strong> — we do not
                  currently use analytics or advertising cookies on this
                  site. If we add tools such as Google Analytics or
                  conversion tracking in the future, this policy will be
                  updated to describe what is collected and how you can opt
                  out.
                </li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your estimate request or inquiry</li>
                <li>Schedule inspections, estimates, and project work</li>
                <li>
                  Communicate with you about your project, including by
                  phone, text, or email
                </li>
                <li>
                  Maintain records required for permits, warranties, and
                  insurance documentation
                </li>
                <li>Improve our website and services</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>

              <h2>How We Share Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>
                  Employees and subcontractors directly involved in
                  estimating or completing your project
                </li>
                <li>
                  Service providers who help us operate this website, store
                  data, or process lead submissions (for example, a CRM or
                  email service provider)
                </li>
                <li>
                  Your insurance company or adjuster, but only when you ask
                  us to assist with a storm-damage or insurance claim
                </li>
                <li>
                  Government agencies, when required by law or to obtain
                  permits for your project
                </li>
              </ul>
              <p>
                We do not share your information with third parties for
                their own marketing purposes.
              </p>

              <h2>Data Retention</h2>
              <p>
                We retain project and customer information for as long as
                reasonably necessary to fulfill the purposes described in
                this policy, including ongoing warranty coverage, and to
                comply with our legal, accounting, and insurance
                obligations.
              </p>

              <h2>Your Choices</h2>
              <p>
                You may contact us at any time to ask what information we
                have on file, request a correction, or ask us to delete
                information that we are not required to retain. You may also
                ask to stop receiving marketing communications from us while
                still remaining a customer on an active project.
              </p>

              <h2>Data Security</h2>
              <p>
                We use reasonable administrative and technical safeguards to
                protect the information submitted through this website.
                However, no method of transmission over the internet is
                completely secure, and we cannot guarantee absolute
                security.
              </p>

              <h2>Children&rsquo;s Privacy</h2>
              <p>
                This website is intended for adults seeking home improvement
                services and is not directed to children under 13. We do
                not knowingly collect personal information from children.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to
                reflect changes to our practices or for legal, operational,
                or regulatory reasons. The &ldquo;Last updated&rdquo; date
                at the top of this page reflects the most recent revision.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how your
                information is handled, contact us at:
              </p>
              <p>
                {BUSINESS_LEGAL_NAME}
                <br />
                Phone: <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, "")}`}>{PHONE_DISPLAY}</a>
                <br />
                Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                Website: <a href={SITE_URL}>{SITE_URL}</a>
              </p>

              <p className="mt-10 text-sm italic">
                This is a general privacy policy template provided for
                convenience and does not constitute legal advice. We
                recommend having this document reviewed by a licensed
                attorney familiar with Pennsylvania and New Jersey law
                before relying on it.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer variant="home" />
    </>
  );
}
