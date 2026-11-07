import { Layout } from "../components/layout/Layout"
import { PageHeader } from "@/components/PageHeader"
import { AboutCharitiesSection, PartnersSection, RecentMediaSection } from "@/components/home/HomeSections"
import { useCity } from "@/lib/city"

import eliasImg from "@/assets/web/elias.jpg"
import jacobImg from "@/assets/web/jacob.jpg"
import leaImg from "@/assets/web/lea.jpg"
import lenkaImg from "@/assets/web/lenka.jpg"
import lukasImg from "@/assets/web/lukas.jpg"
import lauraImg from "@/assets/web/laura.jpg"
import team1Img from "@/assets/web/team1.jpg"
import team3Img from "@/assets/web/team3.jpg"

const values = [
  {
    title: "Sustainability",
    description: "We believe in reducing waste and giving items a second chance at life.",
  },
  {
    title: "Compassion",
    description: "Every action we take is driven by our desire to help children in need.",
  },
  {
    title: "Community",
    description: "Built by students, for students. We understand the student life.",
  },
  {
    title: "Transparency",
    description: "100% of our profits go directly to RBU.",
  },
]

const boardMembers = [
  { name: "Jacob Lehmann", role: "President & Founder", img: jacobImg },
  { name: "Elias Foppa", role: "Vice President & Treasurer", img: eliasImg },
  { name: "Lea Poewe", role: "Secretary & Head of Marketing", img: leaImg },
]

const uppsalaMembers = [
  { name: "Lenka Benková", role: "Founding Member", img: lenkaImg },
  { name: "Lukas Idman", role: "Founding Member", img: lukasImg },
  { name: "Laura Fuertes", role: "Donation and Staff Management", img: lauraImg },
]

const About = () => {
  const city = useCity()
  const teamMembers = city.isLund ? boardMembers : [...boardMembers, ...uppsalaMembers]

  return (
    <Layout>
      <PageHeader
        title="About Swecircle"
        intro={`As new students in Uppsala, we struggled to find second-hand essentials, while others moving out were throwing away perfectly good items. What started as "Rackis för Barn" in Uppsala has now evolved into Swecircle, and we've been working ever since to tackle these problems across student cities.`}
      />

      <img
        src={team1Img}
        alt="The Swecircle team holding donated items in front of a snow-covered picnic table"
        className="w-full aspect-[3/2] md:aspect-[2/1] object-cover object-[50%_80%]"
      />

      {/* Who we are */}
      <section className="section-padding">
        <div className="container grid lg:grid-cols-12 gap-x-8 gap-y-6">
          <h2 className="display-2 lg:col-span-5">A second-hand store run by and for students</h2>
          <div className="lg:col-span-6 lg:col-start-7 space-y-4 text-lg leading-relaxed">
            <p>
              Swecircle is a student-run non-profit organization designed specifically for students to exchange second-hand items during move-ins and move-outs. What makes us unique is that we collect and sell second-hand items directly at student housing locations, making settling into your new city more convenient and sustainable.
            </p>
            <p>
              When students move out, instead of throwing away items they donate them to us. We collect many items like bedding, curtains, bikes, kitchen equipment, lamps, small furniture, decoration, and much more. Then, students moving into new places can find everything they need at fair prices.
            </p>
            <p className="font-semibold">
              All profits from sales go directly to RBU, supporting children and their families.
            </p>
            <p>
              Swecircle won the{" "}
              <a
                href="https://enlight-eu.org/university-about-us/news-events/158-news/1791-student-led-change-enlight-celebrating-ideas-that-make-a-difference"
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule text-primary"
              >
                ENLIGHT Sustainability Award 2026
              </a>
              , presented by the European university alliance that includes Uppsala University. The jury called us “a highly engaging student-led project that effectively promotes circular economy principles through a concrete approach.”
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-foreground" />
      <RecentMediaSection />

      {/* History */}
      <section className="section-padding bg-secondary">
        <div className="container">
          <h2 className="display-2 max-w-3xl mb-12 md:mb-16">From Rackis för Barn to Swecircle</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="border-t-2 border-foreground pt-4">
              <h3 className="text-2xl font-semibold tracking-tight mb-3">Rackis för Barn</h3>
              <p className="text-lg leading-relaxed">
                We started our journey in Uppsala under the name Rackis för Barn. "Rackis" is short for Rackarbergsgatan, the student housing area where we began, and "Barn" means children in Swedish, reflecting our mission to support children in need.
              </p>
            </div>
            <div className="border-t-2 border-foreground pt-4">
              <h3 className="text-2xl font-semibold tracking-tight mb-3">Swecircle</h3>
              <p className="text-lg leading-relaxed">
                As we expanded beyond Uppsala, we needed a name that reflected our wider mission. Swecircle combines “Swe” for Sweden with “circle” for the sustainable cycle of donating, reusing, and buying second-hand items. The name captures our vision of giving items a longer life while creating positive impact for people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="display-2">Our team</h2>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground">
              We are a group of dedicated students who believe in sustainability, community, and making a difference.
            </p>
          </div>

          <ul className={`grid grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-10 ${city.isLund ? "md:grid-cols-3" : "md:grid-cols-3 xl:grid-cols-6"}`}>
            {teamMembers.map((member) => (
              <li key={member.name}>
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                  draggable={false}
                />
                <h3 className="mt-3 text-xl font-semibold tracking-tight leading-tight">{member.name}</h3>
                <p className="mt-1 text-muted-foreground leading-snug">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <figure>
        <img
          src={team3Img}
          alt="Volunteers walking through deep snow outside student housing while one films them"
          loading="lazy"
          className="w-full aspect-[3/2] md:aspect-[2/1] object-cover object-[50%_80%]"
        />
        <figcaption className="container py-4 text-muted-foreground">
          We have many amazing volunteers who contribute their time and effort to make Swecircle possible.
        </figcaption>
      </figure>

      <AboutCharitiesSection />

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container">
          <h2 className="display-2 mb-12 md:mb-16">Our values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {values.map((value) => (
              <div key={value.title} className="border-t border-foreground pt-4">
                <h3 className="text-2xl font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />
    </Layout>
  )
}

export default About
