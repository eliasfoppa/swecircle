import { Layout } from "@/components/layout/Layout";
import { Facts, PageHeader } from "@/components/PageHeader";
import { ItemCategories } from "@/components/ItemCategories";
import { Button } from "@/components/ui/button";
import { useCity } from "@/lib/city";
import { Instagram } from "lucide-react";
import storageImg from "@/assets/web/storage.jpg";

export function Buy() {
  const city = useCity();

  const facts = [
    {
      label: "Where to find us",
      value: city.isLund ? "Check our Instagram for the exact sale location" : "Rackarbergsgatan 32",
    },
    {
      label: "When we open",
      value: (
        <>
          Opening times vary. Check our{" "}
          <a href={city.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-rule">
            Instagram
          </a>{" "}
          for the latest schedule.
        </>
      ),
    },
    {
      label: "How to buy",
      value: "First-come, first-served. Come early!",
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Buy items"
        intro="At the beginning of each semester, we host a large sale for students moving in. Be quick to find the best deals!"
        image={storageImg}
        imageAlt="Two volunteers in a storage unit with a lamp, a mirror and a plant"
        imagePosition="50% 80%"
        action={
          <Button variant="accent" size="lg" className="w-full sm:w-auto px-4 sm:px-7 text-base sm:text-lg" asChild>
            <a href={city.instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram />
              Check Instagram for updates
            </a>
          </Button>
        }
      />
      <Facts facts={facts} />
      <ItemCategories
        title="What you can buy"
        intro="We offer second-hand items perfect for your new room. Here is what you can typically find at our sales."
      />
    </Layout>
  );
}

export default Buy;
