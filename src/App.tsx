import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react"
import { Routes, Route, Outlet, Link, useParams, Navigate } from "react-router-dom";

import { ScrollManager } from "@/components/ScrollManager";
import Logo from "@/assets/logo.png";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Buy from "./pages/Buy";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const cities = [
  {
    slug: "uppsala",
    name: "Uppsala",
    note: "Original location",
    panel: "bg-primary text-primary-foreground",
  },
  {
    slug: "lund",
    name: "Lund",
    note: "New location",
    panel: "bg-warm text-warm-foreground",
  },
];

export function Gateway() {
  return (
    <main className="relative min-h-svh grid md:grid-cols-2">
      <h1 className="sr-only">Welcome to Swecircle. Select your city to continue.</h1>

      {cities.map((city) => (
        <Link
          key={city.slug}
          to={`/${city.slug}`}
          className={`group flex flex-col justify-end p-5 lg:p-10 pt-24 md:pt-10 ${city.panel}`}
        >
          <span className="text-xl font-medium">{city.note}</span>
          <span className="flex items-end justify-between gap-4">
            <span className="text-[min(11rem,max(11vw,min(18.5vw,4.5rem)))] font-semibold leading-none tracking-tighter">
              {city.name}
            </span>
            <ArrowRight className="mb-[0.6em] h-10 w-10 lg:h-14 lg:w-14 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
          </span>
        </Link>
      ))}

      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-5 lg:px-10 lg:py-8 pointer-events-none">
        <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-primary-foreground">
          <img src={Logo} alt="" className="h-11 w-11" />
          Swecircle
        </span>
        <span className="hidden md:block text-xl font-medium text-warm-foreground">Select your city to continue</span>
      </div>
    </main>
  )
}

// The Layout that wraps the location pages
function LocationLayout() {
  const { location } = useParams();

  // Validate the city
  const validLocations = ["uppsala", "lund"];
  
  if (location && !validLocations.includes(location.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollManager />

        {/* Removed HashRouter wrapper, leaving just the Routes as you originally had */}
        <Routes>
          <Route path="/" element={<Gateway />} />

          <Route path="/:location" element={<LocationLayout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="impressum" element={<Impressum />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="buy" element={<Buy />} />
            <Route path="donate" element={<Donate />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}