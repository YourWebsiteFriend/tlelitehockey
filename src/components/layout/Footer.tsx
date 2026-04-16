import Image from "next/image";
import Link from "next/link";
import { FooterSignupForm } from "@/components/layout/FooterSignupForm";

const columnHeadingClass =
  "text-[#F78E2B] text-xs font-bold uppercase tracking-widest mb-4";

const linkClass =
  "text-white/70 text-sm hover:text-white transition-colors duration-150 focus:outline-none focus-visible:underline";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main grid */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Logo */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              aria-label="TL Elite Hockey — Home"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded-full"
            >
              <Image
                src="/images/logo-primary.png"
                alt="TL Elite Hockey badge"
                width={90}
                height={90}
                className="rounded-full"
              />
            </Link>
          </div>

          {/* Col 2 — Where to Find Us */}
          <div>
            <h3 className={columnHeadingClass}>Where to Find Us</h3>
            <address className="not-italic flex flex-col gap-2">
              <p className="text-white/70 text-sm leading-relaxed">
                1515 Washington Street<br />
                Braintree, MA 02184
              </p>
              <a
                href="tel:5086415842"
                className={linkClass}
              >
                508-641-5842
              </a>
              <a
                href="mailto:info@tlelitehockey.com"
                className={linkClass}
              >
                info@tlelitehockey.com
              </a>
            </address>
          </div>

          {/* Col 3 — Helpful Links */}
          <div>
            <h3 className={columnHeadingClass}>Helpful Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/book" className={linkClass}>
                    Our Sessions
                  </Link>
                </li>
                <li>
                  <Link href="/clinics" className={linkClass}>
                    Clinics
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className={linkClass}>
                    Packages
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className={linkClass}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/private-lessons" className={linkClass}>
                    Private Lessons
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={linkClass}>
                    About TL Elite
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Col 4 — Stay Updated */}
          <div>
            <h3 className={columnHeadingClass}>Stay Updated</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-1">
              Get session drops, clinic announcements, and TL Elite news.
            </p>
            <FooterSignupForm />

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/tlelitehockey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TL Elite Hockey on Facebook"
                className="text-white/50 hover:text-white transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tlelitehockey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TL Elite Hockey on Instagram"
                className="text-white/50 hover:text-white transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <span>© 2026 TL Elite Hockey School LLC</span>
          </div>
          <p className="text-white/40 text-xs">
            Managed by{" "}
            <a
              href="https://yourwebsitefriend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors focus:outline-none focus-visible:underline"
            >
              Your Website Friend
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
