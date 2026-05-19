import { Link, useParams } from "react-router-dom"; // Added useParams
import { Heart, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/impressum", label: "Impressum" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Grab the current city from the URL to fix the links
  const { location: cityParam } = useParams()
  const currentCity = cityParam || ""

  // Automatically capitalize the city name for the text description
  const displayCity = currentCity 
    ? currentCity.charAt(0).toUpperCase() + currentCity.slice(1) 
    : "Sweden"

  const isLund = currentCity.toLowerCase() === "lund"
  const instaUrl = isLund 
    ? "https://www.instagram.com/swecirclelund/" 
    : "https://instagram.com/swecircle"
  const instaHandle = isLund ? "@swecirclelund" : "@swecircle"

  return (
    <footer className="bg-section-alt border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            {/* Logo link now routes safely back to the city's home page */}
            <Link to={`/${currentCity}`} className="inline-block">
              <span className="text-xl font-bold text-primary">Swecircle</span>
            </Link>
            {/* The description automatically updates based on the city */}
            <p className="text-sm text-muted-foreground max-w-xs">
              A student-run second-hand store in {displayCity}. All proceeds go to helping children in need.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href={instaUrl} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 mr-2" />
                Follow {instaHandle}
              </a>
            </Button>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Organization</h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  {/* Injected the city into the URL path */}
                  <Link
                    to={`/${currentCity}${link.href}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  {/* Injected the city into the URL path */}
                  <Link
                    to={`/${currentCity}${link.href}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Rackis för Barn / Swecircle. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-accent fill-accent" /> by students
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}