
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Wiru.app',
  description: 'Terms of Service for Wiru.app. Read the terms and conditions for using our services.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <article className="prose prose-lg max-w-4xl mx-auto text-foreground prose-headings:text-primary prose-headings:font-headline prose-a:text-primary hover:prose-a:underline">
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section className="mt-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing and using Wiru.app (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
            </p>
        </section>

        <section className="mt-8">
            <h2>2. Use of Our Services</h2>
            <p>
                You agree to use the Service only for lawful purposes. You are prohibited from any use of the Services that would constitute an illegal offense, give rise to liability, or otherwise violate any applicable local, state, national, or international law or regulation.
            </p>
             <p>
                We provide digital assets such as source code for websites and applications ("Templates"). When you purchase a Template, you are granted a license to use that Template. The specifics of this license may vary per Template and will be outlined at the time of purchase. You may not resell, redistribute, or share the Templates without explicit permission.
            </p>
        </section>

        <section className="mt-8">
            <h2>3. Intellectual Property</h2>
            <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of Wiru.app and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Wiru.app.
            </p>
        </section>

        <section className="mt-8">
            <h2>4. Limitation of Liability</h2>
            <p>
                In no event shall Wiru.app, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
        </section>

        <section className="mt-8">
            <h2>5. Governing Law</h2>
            <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.
            </p>
        </section>
        
        <section className="mt-8">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:aplikasiwiru@gmail.com">aplikasiwiru@gmail.com</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
