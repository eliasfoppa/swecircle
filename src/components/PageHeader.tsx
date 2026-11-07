import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  action?: ReactNode;
}

export function PageHeader({ title, intro, image, imageAlt = "", imagePosition = "center", action }: PageHeaderProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className={image ? "grid lg:grid-cols-12" : ""}>
        <div className={`pl-page pr-5 lg:pr-10 pt-16 pb-14 md:pt-24 md:pb-20 ${image ? "lg:col-span-7 flex flex-col justify-end" : ""}`}>
          <h1 className="display-1 animate-fade-up">{title}</h1>
          {intro && (
            <div className="mt-6 max-w-2xl text-lg md:text-xl leading-snug text-white/85 animate-fade-up delay-100">
              {intro}
            </div>
          )}
          {action && <div className="mt-8 animate-fade-up delay-200">{action}</div>}
        </div>
        {image && (
          <div className="relative h-72 sm:h-96 lg:col-span-5 lg:h-auto lg:min-h-[30rem]">
            <img
              src={image}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

interface FactsProps {
  facts: { label: string; value: ReactNode }[];
}

/** The where / when / how strip on the Buy and Donate pages. */
export function Facts({ facts }: FactsProps) {
  return (
    <section className="border-b border-foreground">
      <dl className="container grid md:grid-cols-3">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`py-8 md:py-10 ${i > 0 ? "border-t border-border md:border-t-0 md:border-l md:pl-8" : ""} ${i < facts.length - 1 ? "md:pr-8" : ""}`}
          >
            <dt className="text-base text-muted-foreground">{fact.label}</dt>
            <dd className="mt-2 text-xl md:text-2xl font-medium leading-snug tracking-tight">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
