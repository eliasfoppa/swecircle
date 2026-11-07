import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Instagram, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCity } from "@/lib/city";
import uuInnovationLogo from "@/assets/uu-innovation.png";
import uppsalahemLogo from "@/assets/uppsalahem.png";
import rbuLogo from "@/assets/rbu.png";
import världklassLogo from "@/assets/vku.png";
import heroImg from "@/assets/web/team2.jpg";
import pic1 from "@/assets/web/pic1.jpg";
import pic2 from "@/assets/web/pic2.jpg";
import pic3 from "@/assets/web/pic3.jpg";
import pic4 from "@/assets/web/pic4.jpg";
import pic5 from "@/assets/web/pic5.jpg";

export function HeroSection() {
  const city = useCity();

  const paths = [
    { to: `/${city.slug}/buy`, lead: "Moving in?", action: "Shop second-hand" },
    { to: `/${city.slug}/donate`, lead: "Moving out?", action: "Donate your things" },
  ];

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="grid lg:grid-cols-12 lg:min-h-[calc(100svh-4.5rem)]">
        <div className="lg:col-span-7 pl-page pr-5 lg:pr-12 pt-12 md:pt-20 pb-8 lg:pb-10 flex flex-col justify-between gap-12">
          <div>
            <h1 className="display-1 animate-fade-up">
              Give items a <span className="text-warm whitespace-nowrap">second life</span> and help children in need
            </h1>
            <p className="mt-7 max-w-xl text-lg md:text-xl leading-snug text-white/85 animate-fade-up delay-100">
              Donated items become affordable finds for fellow students in {city.label}, and all profit goes directly to RBU.
            </p>
          </div>

          <div className="border-b border-white/35 animate-fade-up delay-200">
            {paths.map((path) => (
              <Link
                key={path.to}
                to={path.to}
                className="group flex items-center justify-between gap-4 border-t border-white/35 py-4 text-xl md:text-2xl tracking-tight transition-colors hover:text-warm"
              >
                <span>
                  <span className="font-semibold">{path.lead}</span> {path.action}
                </span>
                <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-5 min-h-[22rem] sm:min-h-[30rem]">
          <img
            src={heroImg}
            alt="The Swecircle team in the snow, holding up donated pans, pillows and bags"
            className="absolute inset-0 h-full w-full object-cover object-[46%_50%] animate-fade-in"
          />
          <div className="sticker absolute -top-10 right-5 lg:top-auto lg:right-auto lg:bottom-48 lg:-left-20 w-32 lg:w-44 -rotate-[8deg] animate-sticker">
            <p className="font-semibold leading-none tracking-tight text-[0.95rem] lg:text-xl">
              <span className="block text-[2rem] lg:text-5xl tracking-tighter mb-1">100%</span>
              of profits<br />to RBU
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const city = useCity();

  const steps: { title: string; description: string; to?: string; scrollTo?: string }[] = [
    {
      title: "Moving in?",
      description: `We've got you covered with affordable essentials for your first days in ${city.label} and beyond.`,
      to: `/${city.slug}/buy`,
    },
    {
      title: "Give back",
      description: "Feel good knowing 100% of our profits go directly to the RBU charity.",
      scrollTo: "charities",
    },
    {
      title: "Moving out?",
      description: "Give items a second life instead of throwing them away. We accept everything from bedding to bikes.",
      to: `/${city.slug}/donate`,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container grid lg:grid-cols-12 gap-x-8 gap-y-10">
        <div className="lg:col-span-4">
          <h2 className="display-2">How it works</h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-sm">
            A simple cycle that helps students, reduces waste, and supports a great cause.
          </p>
        </div>

        <ol className="lg:col-span-8 border-b border-foreground">
          {steps.map((step, i) => {
            const content = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground text-lg font-medium transition-colors group-hover:bg-warm group-hover:border-warm">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-3xl md:text-[2.5rem] md:leading-none font-semibold tracking-tight">
                    {step.title}
                  </span>
                  <span className="block mt-3 max-w-xl text-muted-foreground">{step.description}</span>
                </span>
                <ArrowRight className="hidden sm:block h-6 w-6 mt-2 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            );
            const rowClass = "group grid grid-cols-[2.75rem_1fr] sm:grid-cols-[2.75rem_1fr_auto] gap-x-5 md:gap-x-8 py-7 md:py-9";

            return (
              <li key={step.title} className="border-t border-foreground">
                {step.scrollTo ? (
                  <button
                    type="button"
                    onClick={() => document.getElementById(step.scrollTo)?.scrollIntoView({ behavior: "smooth" })}
                    className={`${rowClass} w-full text-left`}
                  >
                    {content}
                  </button>
                ) : (
                  <Link to={step.to} className={rowClass}>{content}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// Every frame matches its photo's shape, so nobody gets cropped
const posts = [
  { img: pic1, alt: "Five students in a car park carrying a mirror, bags and a bin", frame: "col-span-2 lg:col-span-1 aspect-[4/3]" },
  { img: pic5, alt: "A volunteer smiling in a storage corridor holding a stack of mugs", frame: "aspect-[3/4]" },
  { img: pic3, alt: "A volunteer pushing a bicycle through deep snow with a blue bag and stacked buckets", frame: "aspect-[3/4]" },
  { img: pic2, alt: "A volunteer in a storage area with a framed print and a white shelf", frame: "aspect-[3/4]" },
  { img: pic4, alt: "Five people indoors, one of them holding up a certificate", frame: "aspect-[3/4]" },
];

export function CommunitySection() {
  const city = useCity();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const step = (delta: number) =>
    setActiveIndex((i) => (i === null ? i : (i + delta + posts.length) % posts.length));

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <section className="pb-20 md:pb-28">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <h2 className="display-2">Swecircle in action</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Behind the scenes, from our busy sales to collecting donations.
            </p>
          </div>
          <a
            href={city.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule inline-flex items-center gap-2 text-lg font-medium shrink-0"
          >
            <Instagram className="h-5 w-5" />
            {city.instagramHandle}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-1.5 lg:block">
          {/* 16fr:9fr gives a 4:3 and a 3:4 photo the same height */}
          {[
            { start: 0, end: 2, row: "lg:grid-cols-[16fr_9fr]" },
            { start: 2, end: 5, row: "lg:grid-cols-3 lg:mt-1.5" },
          ].map(({ start, end, row }) => (
            <div key={start} className={`contents lg:grid lg:gap-1.5 ${row}`}>
              {posts.slice(start, end).map((post, i) => (
                <button
                  key={post.img}
                  type="button"
                  onClick={() => setActiveIndex(start + i)}
                  aria-label={`Enlarge photo: ${post.alt}`}
                  className={`group relative overflow-hidden bg-secondary cursor-zoom-in ${post.frame}`}
                >
                  <img
                    src={post.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-foreground/95 flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setActiveIndex(null)}
          aria-modal="true"
          role="dialog"
        >
          <img
            src={posts[activeIndex].img}
            alt={posts[activeIndex].alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
          <button type="button" aria-label="Close" onClick={() => setActiveIndex(null)} className="absolute top-4 right-4 p-2 text-white">
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 text-white"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 text-white"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}

export function StatsCounterSection() {
  return (
    <section className="bg-primary text-primary-foreground overflow-hidden">
      <div className="container grid lg:grid-cols-12 items-center gap-x-8 gap-y-10 pt-20 lg:py-0">
        <div className="lg:col-span-5">
          <p className="text-xl font-medium mb-4">Our impact so far</p>
          <h2 className="display-1">Small items, real difference</h2>
          <p className="mt-8 max-w-md border-t border-white/35 pt-4 text-lg leading-snug text-white/85">
            <a
              href="https://enlight-eu.org/university-about-us/news-events/158-news/1791-student-led-change-enlight-celebrating-ideas-that-make-a-difference"
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule block text-xl font-semibold tracking-tight text-warm"
            >
              Winner of the ENLIGHT Sustainability Award 2026
            </a>
            An award from ENLIGHT, a European university alliance that includes Uppsala University.
          </p>
        </div>

        <div className="lg:col-span-7 relative h-[30rem] sm:h-[36rem] lg:h-[42rem]">
          <div className="sticker absolute -right-8 -bottom-16 min-[1400px]:-right-6 min-[1400px]:-bottom-20 w-[23rem] sm:w-[28rem] min-[1400px]:w-[34rem]">
            <p>
              <span className="block text-7xl sm:text-[5.5rem] min-[1400px]:text-[6.5rem] font-semibold tracking-tighter leading-none">150 000</span>
              <span className="block mt-3 text-xl min-[1400px]:text-2xl font-medium leading-tight">SEK+ donated<br />to charity</span>
            </p>
          </div>
          <div className="sticker absolute left-0 top-0 lg:top-8 min-[1400px]:left-[6.5rem] min-[1400px]:top-16 w-[47%] sm:w-44 min-[1400px]:w-56 bg-white text-foreground">
            <p>
              <span className="block text-3xl sm:text-4xl min-[1400px]:text-5xl font-semibold tracking-tighter leading-none">1 000+</span>
              <span className="block mt-2 text-sm sm:text-base min-[1400px]:text-lg font-medium leading-tight">students<br />helped</span>
            </p>
          </div>
          <div className="sticker absolute right-0 top-0 lg:top-8 min-[1400px]:right-auto min-[1400px]:left-0 min-[1400px]:top-auto min-[1400px]:bottom-8 w-[47%] sm:w-44 min-[1400px]:w-56 border border-white bg-primary text-primary-foreground">
            <p>
              <span className="block text-3xl sm:text-4xl min-[1400px]:text-5xl font-semibold tracking-tighter leading-none">200 000</span>
              <span className="block mt-2 text-sm sm:text-base min-[1400px]:text-lg font-medium leading-tight">SEK+<br />in sales</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const mediaItems = [
  {
    publisher: "Uppsala University",
    date: "March 2026",
    title: "Where student life meets sustainability and social impact",
    url: "https://www.uu.se/en/news/2026/2026-03-24-where-student-life-meets-sustainability-and-social-impact",
    action: "Read article",
    lang: "en",
  },
  {
    publisher: "Ergo",
    date: "March 2026",
    title: "Students turn abandoned items into charity",
    url: "https://ergo.nu/reportage/20260320-students-turn-abandoned-items-into-charity",
    action: "Read article",
    lang: "en",
  },
  {
    publisher: "RBU Uppsala",
    date: "March 2026",
    title: "Årsmöte 2026 avklarat, nygammal styrelse och donation från Rackis för barn!",
    url: "https://uppsala.rbu.se/2026/03/20/arsmote-2026-avklarat-nygammal-styrelse-och-donation-fran-rackis-for-barn/",
    action: "Read article",
    lang: "sv",
  },
  {
    publisher: "SVT Nyheter Uppsala",
    date: "February 2026",
    title: "Här säljer de vidare studenternas gamla lakan",
    url: "https://www.svt.se/nyheter/lokalt/uppsala/sa-loste-studenterna-flyttsvinnet",
    action: "Watch video",
    lang: "sv",
  },
  {
    publisher: "Uppsala Nya Tidning",
    date: "January 2026",
    title: "Räckis för barn öppnar second hand-butik i Uppsala",
    url: "https://www.unt.se/nyheter/uppsala/artikel/rackis-for-barn-oppnar-second-hand-butik-i-uppsala/jn11gonl",
    action: "Read article",
    lang: "sv",
  },
  {
    publisher: "Sveriges Radio P4 Uppland",
    date: "January 2026",
    title: "Utbytesstudenter säljer prylar och skänker pengarna till barn",
    url: "https://www.sverigesradio.se/artikel/utbytesstudenter-skanker-pengar-till-barncancerfonden",
    action: "Listen now",
    lang: "sv",
  },
];

export function RecentMediaSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="display-2 mb-10 md:mb-14">In the news</h2>

        <ul className="border-b border-foreground">
          {mediaItems.map((media) => (
            <li key={media.url} className="border-t border-foreground">
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${media.action}: ${media.title} (${media.publisher})`}
                className="group grid md:grid-cols-12 gap-x-8 gap-y-1 py-5 md:py-6 md:items-center"
              >
                <span className="md:col-span-3 font-semibold">{media.publisher}</span>
                <span lang={media.lang} className="md:col-span-6 text-xl tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {media.title}
                </span>
                <span className="md:col-span-2 text-muted-foreground">{media.date}</span>
                <span className="hidden md:flex md:col-span-1 justify-end">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const benefits = [
    {
      title: "Easy move-in",
      description: "Shop directly at student housing so you can get what you need without extra trips around town.",
    },
    {
      title: "Better for the planet",
      description: "Donated items get used again instead of being thrown away, which means less waste and more value for everyone.",
    },
    {
      title: "Supports a good cause",
      description: "All profits go to RBU, so your essentials support children and families in need.",
    },
    {
      title: "Affordable for students",
      description: "Affordable basics and quality finds, so you can set up your room without spending a fortune.",
    },
    {
      title: "Student-run",
      description: "We know the move-in stress and the move-out chaos, so we focus on what actually helps.",
    },
    {
      title: "A bit of everything",
      description: "From bedsheets to bikes, you can find practical essentials and a few great surprises too.",
    },
  ];

  return (
    <section className="pt-20 md:pt-28 pb-10 md:pb-16 bg-secondary">
      <div className="container">
        <h2 className="display-2 max-w-3xl mb-12 md:mb-16">Why students shop with us</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="border-t border-foreground pt-4 pb-10 md:pb-12">
              <h3 className="text-2xl font-semibold tracking-tight">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutCharitiesSection() {
  return (
    <section id="charities" className="bg-warm text-warm-foreground scroll-mt-[4.5rem]">
      <div className="container section-padding grid lg:grid-cols-12 gap-x-8 gap-y-10 items-end">
        <div className="lg:col-span-7">
          <p className="text-xl font-medium mb-5">Supporting children in need</p>
          <h2 className="display-1">100% of profits go to RBU</h2>
        </div>

        <div className="lg:col-span-5">
          <img src={rbuLogo} alt="RBU logo" className="h-24 w-24 md:h-28 md:w-28 mb-6" />
          <p className="text-lg leading-snug">
            Riksförbundet för Rörelsehindrade Barn och Ungdomar works to improve the lives of children and young people with mobility impairments in Sweden through advocacy and support programs.
          </p>
          <a
            href="https://www.uppsala.rbu.se"
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule inline-block mt-4 text-lg font-semibold"
          >
            Learn more at rbu.se
          </a>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  const partners = [
    {
      name: "Uppsala University Innovation",
      logo: uuInnovationLogo,
      description: "Uppsala University Innovation provides guidance and resources to help Swecircle expand its reach and positive impact.",
      url: "https://www.uuinnovation.uu.se",
    },
    {
      name: "Världsklass Uppsala",
      logo: världklassLogo,
      description: "Världsklass Uppsala provides generous financial support to help Swecircle maximize its impact, scale operations, and accelerate sustainable growth.",
      url: "https://varldsklassuppsala.se/",
    },
    {
      name: "Uppsalahem",
      logo: uppsalahemLogo,
      description: "Uppsalahem generously provides access to storage units, enabling us to collect and sell items directly at student housing locations.",
      url: "https://www.uppsalahem.se",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="display-2 mb-10 md:mb-14">With support from</h2>

        <div className="grid md:grid-cols-3 gap-x-8">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-foreground pt-6 pb-10 md:pb-0"
            >
              <div className="flex h-32 items-center mb-5">
                <img src={partner.logo} alt={`${partner.name} logo`} className="max-h-full max-w-[14rem] object-contain object-left" />
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">{partner.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const city = useCity();

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container section-padding grid lg:grid-cols-12 gap-x-8 gap-y-8 items-end">
        <div className="lg:col-span-8">
          <h2 className="display-1">
            {city.isLund ? "Opening times are on Instagram" : "Find us at Rackarbergsgatan 32"}
          </h2>
          {!city.isLund && (
            <p className="mt-5 text-xl text-white/85">Opening times vary, so check our Instagram before you come.</p>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-stretch">
          <Button variant="accent" size="lg" asChild>
            <a href={city.instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram />
              Follow {city.instagramHandle}
            </a>
          </Button>
          <Button variant="outline-inverse" size="lg" asChild>
            <Link to={`/${city.slug}/contact`}>Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
