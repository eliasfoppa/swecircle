import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="section-padding">
        <div className="container grid md:grid-cols-12 items-center gap-x-8 gap-y-10">
          <div className="md:col-span-7">
            <h1 className="display-1">Page not found</h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Sorry, we couldn't find the page you were looking for. It may have been moved or removed.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <div className="sticker w-56 md:w-80 -rotate-[8deg] text-7xl md:text-8xl font-semibold tracking-tighter">404</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
