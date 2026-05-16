import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MapPin, ArrowRight } from "lucide-react"
import { Routes, Route, Outlet, Link, useParams, Navigate } from "react-router-dom";

import { ScrollManager } from "@/components/ScrollManager";

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

export function Gateway() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      {/* Increased max-width for desktop (max-w-md), stays compact on mobile (max-w-sm) */}
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
        
        {/* Minimal Blue Accent Line scales slightly on desktop */}
        <div className="w-8 h-1 sm:w-10 sm:h-1.5 bg-primary rounded-full mb-6 sm:mb-8" />

        {/* Refined Typography scales up smoothly */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2 sm:mb-3">
            Welcome to <span className="text-primary">Swecircle</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Select your city to continue
          </p>
        </div>

        {/* Sleek Selection List with increased padding/gap on desktop */}
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          
          <Link 
            to="/uppsala"
            className="group relative flex items-center p-4 sm:p-5 bg-white border border-stone-200 rounded-2xl sm:rounded-3xl hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
          >
            {/* Icon container gets slightly larger */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-50 flex items-center justify-center mr-4 sm:mr-5 group-hover:bg-primary/5 transition-colors duration-300">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                Uppsala
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Original location</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </Link>

          <Link 
            to="/lund"
            className="group relative flex items-center p-4 sm:p-5 bg-white border border-stone-200 rounded-2xl sm:rounded-3xl hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-50 flex items-center justify-center mr-4 sm:mr-5 group-hover:bg-primary/5 transition-colors duration-300">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                Lund
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">New location</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </Link>

        </div>
      </div>
    </div>
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