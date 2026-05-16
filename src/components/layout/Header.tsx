import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";

const navLinks = [
  { href: "", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { location: cityParam } = useParams();

  const currentCity = (cityParam || "").toLowerCase();

  const instagramByCity: Record<string, { href: string; handle: string }> = {
    uppsala: {
      href: "https://instagram.com/rackis_for_barn",
      handle: "@rackis_for_barn",
    },
    lund: {
      href: "https://instagram.com/swecirclelund",
      handle: "@swecirclelund",
    },
  };

  const instagram = instagramByCity[currentCity] ?? instagramByCity.uppsala;
  const cityLabel =
    currentCity.charAt(0).toUpperCase() + currentCity.slice(1);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to={`/${currentCity}`} className="flex items-center gap-2">
          <img src={Logo} alt="Swecircle Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-primary">
            Swecircle {cityLabel}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const targetPath = `/${currentCity}${link.href}`;

            return (
              <Link
                key={link.href}
                to={targetPath}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === targetPath ||
                    location.pathname === targetPath + "/"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Button variant="outline" size="sm" className="ml-2" asChild>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4 mr-2" />
              {instagram.handle}
            </a>
          </Button>

          <Button size="sm" className="ml-2" asChild>
            <Link to={`/${currentCity}/donate`}>Donate</Link>
          </Button>

          <Button size="sm" className="ml-2" asChild>
            <Link to={`/${currentCity}/buy`}>Buy</Link>
          </Button>

          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground ml-4 pl-4 border-l border-border/50 transition-colors"
          >
            Change City
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const targetPath = `/${currentCity}${link.href}`;

              return (
                <Link
                  key={link.href}
                  to={targetPath}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === targetPath ||
                      location.pathname === targetPath + "/"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Button variant="outline" size="sm" className="mt-2" asChild>
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Follow {instagram.handle}
              </a>
            </Button>

            <Button size="sm" className="mt-2" asChild>
              <Link to={`/${currentCity}/donate`} onClick={() => setIsOpen(false)}>
                Donate
              </Link>
            </Button>

            <Button size="sm" className="mt-2" asChild>
              <Link to={`/${currentCity}/buy`} onClick={() => setIsOpen(false)}>
                Buy
              </Link>
            </Button>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground text-center mt-4 pt-4 border-t border-border/50"
            >
              Change City
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}