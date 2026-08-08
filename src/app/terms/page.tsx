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
  title: "Terms of Service",
  description: `Terms of Service for ${BUSINESS_LEGAL_NAME}, covering estimates, contracts, payment, warranties, and website use.`,
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const EFFECTIVE_DATE = "July 30, 2026";

export default function TermsOfServicePage() {
  return (
    <>
      <Header variant="home" />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <main className="flex-1">
        <section className="bg-paper">
          <Container narrow className="py-16 md:py-24">
            <p className="mb-3 font-body text-xs font-bold tracking-[.14em] text-accent">
              LEGAL
            </p>
            <h1 className="mb-3 font-head text-[32px] font-bold leading-[1.12] text-text sm:text-[40px] 2xl:text-[52px]">
              Terms of Service
            </h1>
            <p className="mb-12 font-body text-sm text-muted">
              Effective Date: {EFFECTIVE_DATE} &nbsp;|&nbsp; {HIC_LICENSE}
            </p>

            <div className="max-w-[70ch] font-body text-[16px] leading-[1.75] text-muted [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-head [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:first:mt-0 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-accent [&_a]:underline [&_strong]:text-text">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing this website or contacting {BUSINESS_LEGAL_NAME}{" "}
                through any channel (contact form, phone, email, Thumbtack,
                Yelp, Google, or in person), you agree to be bound by these
                Terms of Service. If you do not agree, please do not use our
                services.
              </p>

              <h2>2. Services</h2>
              <p>
                {BUSINESS_LEGAL_NAME} provides residential exterior home
                improvement services in Pennsylvania and New Jersey,
                including but not limited to:
              </p>
              <ul>
                <li>Roof replacement and repair</li>
                <li>Deck construction and repair</li>
                <li>Siding installation and replacement</li>
                <li>Fencing installation</li>
              </ul>
              <p>
                Services are performed by licensed professionals.{" "}
                {BUSINESS_LEGAL_NAME} is registered under the Pennsylvania
                Home Improvement Consumer Protection Act (HICPA), {HIC_LICENSE}.
              </p>

              <h2>3. How Clients Find Us</h2>
              <p>
                {BUSINESS_LEGAL_NAME} may be found and contacted through the
                following platforms: our company website, Google Search and
                Google Business Profile, Yelp, and Thumbtack. Inquiries
                submitted through any of these platforms are subject to
                these Terms of Service. Reviews left on third-party
                platforms (Google, Yelp, Thumbtack) are governed by those
                platforms&rsquo; respective policies.
              </p>

              <h2>4. Estimates &amp; Contracts</h2>
              <p>
                All estimates provided are free of charge and valid for 30
                days from the date of issuance. An estimate does not
                constitute a binding agreement.
              </p>
              <p>
                Work will only begin after a written Home Improvement
                Contract has been signed by both parties and a deposit has
                been received. All contracts comply with Pennsylvania HICPA
                requirements, including the 3-day right of cancellation.
              </p>

              <h2>5. Payment Terms</h2>
              <p>
                Payment schedules are outlined in each individual contract.{" "}
                {BUSINESS_LEGAL_NAME} accepts check, cash, Zelle, and credit
                card (subject to a 3% processing fee). Failure to make
                timely payments may result in work stoppage and additional
                fees.
              </p>

              <h2>6. Photos &amp; Portfolio</h2>
              <p>
                {BUSINESS_LEGAL_NAME} may photograph completed work for use
                in marketing materials, social media, and the company
                website. No personally identifiable client information
                (name, address) will be published without written consent.
              </p>
              <p>
                If you do not wish your project to be photographed, please
                notify us in writing before work begins.
              </p>

              <h2>7. Warranties &amp; Liability</h2>
              <p>
                {BUSINESS_LEGAL_NAME} warrants all labor as specified in the
                signed contract. Manufacturer warranties apply to all
                materials used. Our liability is limited to the value of
                the services provided under the signed contract.
              </p>
              <p>{BUSINESS_LEGAL_NAME} is not liable for:</p>
              <ul>
                <li>Pre-existing structural defects or conditions</li>
                <li>
                  Damage to unmarked underground utilities (call PA One
                  Call 811 before digging)
                </li>
                <li>
                  Delays caused by weather, material shortages, or Acts of
                  God
                </li>
                <li>
                  Work performed by third parties or modifications made by
                  others after project completion
                </li>
              </ul>

              <h2>8. Permits</h2>
              <p>
                Responsibility for obtaining necessary permits will be
                specified in the signed contract. When{" "}
                {BUSINESS_LEGAL_NAME} obtains permits, the cost will be
                included in the contract price. The client is responsible
                for ensuring property access and compliance with HOA rules,
                if applicable.
              </p>

              <h2>9. Website Disclaimer</h2>
              <p>
                The content on this website is provided for informational
                purposes only. {BUSINESS_LEGAL_NAME} makes no warranties
                regarding the accuracy or completeness of information on
                this site. Portfolio photos represent actual completed
                projects but individual results may vary based on
                materials, site conditions, and project scope.
              </p>

              <h2>10. Contact Form</h2>
              <p>
                By submitting a contact form on our website, you agree to
                be contacted by {BUSINESS_LEGAL_NAME} via phone, email, or
                SMS regarding your inquiry. We will not sell or share your
                contact information with third parties.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Commonwealth of
                Pennsylvania. Any disputes shall be resolved in accordance
                with Pennsylvania law.
              </p>

              <h2>12. Changes to Terms</h2>
              <p>
                {BUSINESS_LEGAL_NAME} reserves the right to update these
                Terms of Service at any time. Changes will be posted on
                this page with an updated effective date.
              </p>

              <h2>13. Contact</h2>
              <p>For questions about these Terms, contact us:</p>
              <ul>
                <li>
                  Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  Website: <a href={SITE_URL}>{SITE_URL}</a>
                </li>
                <li>{HIC_LICENSE}</li>
              </ul>
            </div>
          </Container>
        </section>
      </main>

      <Footer variant="home" />
    </>
  );
}
