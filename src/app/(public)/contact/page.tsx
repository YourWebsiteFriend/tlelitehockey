import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimateIn } from "@/components/shared/AnimateIn";

export const metadata: Metadata = {
  title: "Contact TL Elite Hockey",
  description:
    "Contact TL Elite Hockey School. Questions about sessions, clinics, or private lessons? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero heading="GET IN TOUCH" backgroundImage="/images/braintree-2.jpg" />

      <SectionWrapper className="bg-black">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Form */}
          <AnimateIn animation="fade-left" className="lg:col-span-2">
            <h2 className="section-heading text-white text-2xl mb-2">
              SEND US A MESSAGE
            </h2>
            <p className="text-white/50 text-sm mb-10">We typically respond within 24–48 hours.</p>
            <ContactForm />
          </AnimateIn>

          {/* Sidebar */}
          <AnimateIn animation="fade-up" delay={200} className="space-y-8">
            {/* Contact Info */}
            <div>
              <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-6">
                CONTACT INFO
              </p>
              <a
                href="mailto:info@tlelitehockey.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-4"
              >
                <Mail className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
                <span className="text-sm">info@tlelitehockey.com</span>
              </a>
              <a
                href="tel:5086415842"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
                <span className="text-sm">(508) 641-5842</span>
              </a>
            </div>

            <hr className="border-white/10" />

            {/* Locations */}
            <div>
              <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-6">
                LOCATIONS
              </p>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">
                      Thayer Sports Center
                    </p>
                    <p className="text-white/50 text-sm">
                      1515 Washington St
                      <br />
                      Braintree, MA 02184
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">
                      Gallo Ice Arena
                    </p>
                    <p className="text-white/50 text-sm">Bourne, MA</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Social */}
            <div>
              <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-6">
                FOLLOW US
              </p>
              <div className="space-y-4">
                <a
                  href="https://instagram.com/tlelitehockey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  {/* Instagram icon */}
                  <svg className="w-4 h-4 text-[#4CAF50]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  <span className="text-sm">@tlelitehockey</span>
                </a>
                <a
                  href="https://facebook.com/tlelitehockey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  {/* Facebook icon */}
                  <svg className="w-4 h-4 text-[#4CAF50]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  <span className="text-sm">TL Elite Hockey</span>
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
        {/* Google Maps embed */}
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 mt-8">
          <iframe
            src="https://maps.google.com/maps?q=Thayer+Sports+Center+1515+Washington+St+Braintree+MA&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Thayer Sports Center location"
          />
        </div>
      </SectionWrapper>
    </>
  );
}
