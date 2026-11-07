import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCity } from "@/lib/city";
import Logo from "@/assets/logo.png";

const navLinks = [
  { href: "", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const city = useCity();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-foreground">
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link to={`/${city.slug}`} className="flex items-center gap-3">
            <img src={Logo} alt="" className="h-10 w-10" />
            <span className="text-xl font-semibold tracking-tight">Swecircle</span>
          </Link>
          {city.hasCity && (
            <Link
              to="/"
              className="hidden sm:inline text-xl tracking-tight text-muted-foreground hover:text-foreground transition-colors"
              title="Change city"
            >
              {city.label}
            </Link>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const targetPath = `/${city.slug}${link.href}`;
            const isActive =
              location.pathname === targetPath ||
              location.pathname === targetPath + "/";

            return (
              <Link
                key={link.href}
                to={targetPath}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-base font-medium underline-offset-[0.4em] decoration-2 hover:underline",
                  isActive && "underline"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={city.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on Instagram ${city.instagramHandle}`}
            className="hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>

          <div className="flex items-center gap-2 ml-1">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/${city.slug}/donate`}>Donate</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/${city.slug}/buy`}>Shop now</Link>
            </Button>
          </div>
        </nav>

        <button
          className="md:hidden -mr-2 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-foreground bg-background animate-fade-in">
          <div className="container pb-6">
            <div className="divide-y divide-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={`/${city.slug}${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 text-2xl font-medium tracking-tight"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={city.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-4 text-2xl font-medium tracking-tight"
              >
                Instagram
              </a>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block py-4 text-2xl font-medium tracking-tight"
              >
                Change city
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button variant="outline" asChild>
                <Link to={`/${city.slug}/donate`} onClick={() => setIsOpen(false)}>
                  Donate
                </Link>
              </Button>
              <Button asChild>
                <Link to={`/${city.slug}/buy`} onClick={() => setIsOpen(false)}>
                  Shop now
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
