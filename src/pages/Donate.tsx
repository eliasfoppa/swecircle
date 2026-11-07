import { Layout } from "@/components/layout/Layout";
import { Facts, PageHeader } from "@/components/PageHeader";
import { ItemCategories } from "@/components/ItemCategories";
import { Button } from "@/components/ui/button";
import { useCity } from "@/lib/city";
import { Instagram } from "lucide-react";
import facadeImg from "@/assets/web/facade.jpg";

export function Donate() {
  const city = useCity();

  const facts = [
    {
      label: "Where to drop off",
      value: city.isLund ? (
        "Check our Instagram for exact drop-off locations"
      ) : (
        <>
          Rackarbergsgatan 32 (Rackis)
          <br />
          or Building Nr. 1 (Flogsta)
        </>
      ),
    },
    {
      label: "When to come",
      value: "At the end of every semester when moving out",
    },
    {
      label: "How it works",
      value: "Send us a DM on Instagram in advance to let us know you are coming",
    },
  ];

  const rules = [
    <>All items must be <strong className="font-semibold">clean and in working condition</strong>.</>,
    <>Textiles must be washed at <strong className="font-semibold">60°C</strong>. If not, please inform us when donating.</>,
    <>We do <strong className="font-semibold">not</strong> accept clothing or toiletries.</>,
    ...(city.isLund ? [<>No large furniture (beds, sofas, wardrobes).</>] : []),
  ];

  return (
    <Layout>
      <PageHeader
        title="Donate items"
        intro="We are collecting donations from now until the end of the semester. Items can be dropped off at the locations below during our collection hours."
        image={facadeImg}
        imageAlt="Five volunteers outside a student housing block with donated items"
        imagePosition="50% 80%"
        action={
          <Button variant="accent" size="lg" className="w-full sm:w-auto px-4 sm:px-7 text-base sm:text-lg" asChild>
            <a href={city.instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram />
              Message us on Instagram
            </a>
          </Button>
        }
      />
      <Facts facts={facts} />

      <section className="section-padding">
        <div className="container grid lg:grid-cols-12 gap-x-8 gap-y-8">
          <h2 className="display-2 lg:col-span-4">Important rules</h2>
          <ol className="lg:col-span-8 border-b border-foreground">
            {rules.map((rule, i) => (
              <li key={i} className="grid grid-cols-[2.75rem_1fr] gap-x-5 md:gap-x-8 items-center border-t border-foreground py-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground text-lg font-medium">
                  {i + 1}
                </span>
                <p className="text-xl md:text-2xl leading-snug tracking-tight">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ItemCategories
        title="What you can donate"
        intro="If you have something that isn't listed below, feel free to ask!"
      >
        <p className="text-xl">
          Not sure about an item?{" "}
          <a href={city.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-rule font-semibold">
            Send us a photo on Instagram
          </a>
        </p>
      </ItemCategories>
    </Layout>
  );
}

export default Donate;
