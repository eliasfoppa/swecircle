import { Link } from "react-router-dom";
import { useCity } from "@/lib/city";

const footerLinks = {
  Organization: [
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
    { href: "/buy", label: "Shop" },
    { href: "/donate", label: "Donate items" },
  ],
  Legal: [
    { href: "/impressum", label: "Impressum" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms & conditions" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const city = useCity();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-6">
            <Link to={`/${city.slug}`} className="text-3xl font-semibold tracking-tight">
              Swecircle
            </Link>
            <p className="mt-4 max-w-sm text-background/70">
              A student-run second-hand store in {city.hasCity ? city.label : "Sweden"}. All proceeds go to helping children in need.
            </p>
            {!city.isLund && <p className="mt-4 text-background/70">Rackarbergsgatan 32, Uppsala</p>}
            <a
              href={city.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule inline-block mt-4"
            >
              {city.instagramHandle}
            </a>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="md:col-span-3">
              <h4 className="text-background/60 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={`/${city.slug}${link.href}`} className="hover:underline underline-offset-4">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-background/20 flex flex-col sm:flex-row justify-between gap-2 text-sm text-background/60">
          <p>© {currentYear} Swecircle. All rights reserved.</p>
          <p>Organisationsnummer 802554-2773</p>
        </div>
      </div>
    </footer>
  );
}
