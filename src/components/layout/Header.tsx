import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { location: cityParam } = useParams();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentCity = (cityParam || "").toLowerCase();

  const instagramByCity: Record<string, { href: string; handle: string }> = {
    uppsala: {
      href: "https://instagram.com/swecircle",
      handle: "@swecircle",
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-all duration-300",
        scrolled
          ? "border-border/70 shadow-[0_1px_20px_-8px_hsl(227_100%_33%_/_0.25)]"
          : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to={`/${currentCity}`} className="flex items-center gap-2.5 group">
          <img
            src={Logo}
            alt="Swecircle Logo"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Swecircle{" "}
            <span className="text-primary">{cityLabel}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const targetPath = `/${currentCity}${link.href}`;
            const isActive =
              location.pathname === targetPath ||
              location.pathname === targetPath + "/";

            return (
              <Link
                key={link.href}
                to={targetPath}
                className={cn(
                  "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-300 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}

          <span className="mx-2 h-5 w-px bg-border" />

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on Instagram ${instagram.handle}`}
            >
              <Instagram className="h-5 w-5" />
            </a>
          </Button>

          <Button variant="outline" size="sm" className="ml-1" asChild>
            <Link to={`/${currentCity}/donate`}>Donate</Link>
          </Button>

          <Button size="sm" className="ml-1.5 shadow-soft" asChild>
            <Link to={`/${currentCity}/buy`}>Shop now</Link>
          </Button>

          <Link
            to="/"
            className="text-xs font-medium text-muted-foreground hover:text-foreground ml-4 pl-4 border-l border-border transition-colors"
          >
            Change city
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

            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link to={`/${currentCity}/donate`} onClick={() => setIsOpen(false)}>
                Donate
              </Link>
            </Button>

            <Button size="sm" className="mt-2" asChild>
              <Link to={`/${currentCity}/buy`} onClick={() => setIsOpen(false)}>
                Shop now
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