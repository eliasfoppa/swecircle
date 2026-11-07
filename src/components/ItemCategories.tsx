import { ReactNode } from "react";

const categories = [
  {
    title: "Household & bedding",
    items: ["Duvets and pillows", "Bed sheets and blankets", "Curtains & rugs", "Small household textiles"],
  },
  {
    title: "Kitchen equipment",
    items: ["Pots, pans & frying pans", "Cutlery and cooking utensils", "Plates, bowls, cups and glasses", "Food storage containers"],
  },
  {
    title: "Electronics",
    items: ["Routers and Wi-Fi equipment", "Extension cords & power strips", "Desk lamps and floor lamps", "Small appliances (kettles, toasters)"],
  },
  {
    title: "And much more",
    items: ["Small shelves and storage boxes", "Mirrors and decoration", "Laundry racks and hangers", "Bicycles in working condition"],
  },
];

interface ItemCategoriesProps {
  title: string;
  intro: string;
  children?: ReactNode;
}

/** The product list shared by the Buy and Donate pages. */
export function ItemCategories({ title, intro, children }: ItemCategoriesProps) {
  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="display-2">{title}</h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground">{intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {categories.map((category) => (
            <div key={category.title} className="border-t-2 border-foreground pt-4">
              <h3 className="text-xl font-semibold tracking-tight mb-4">{category.title}</h3>
              <ul className="divide-y divide-foreground/15">
                {category.items.map((item) => (
                  <li key={item} className="py-2.5">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {children && <div className="mt-12 md:mt-16">{children}</div>}
      </div>
    </section>
  );
}
