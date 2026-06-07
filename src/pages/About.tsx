import { Layout } from "../components/layout/Layout"
import {
  Heart,
  Target,
  Users,
  Award,
  Recycle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Radio,
  Tv,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import eliasImg from "../assets/elias.png"
import jacobImg from "../assets/jacob.png"
import leaImg from "../assets/lea.png"
import lenkaImg from "../assets/lenka.png"
import lukasImg from "../assets/lukas.png"
import lauraImg from "../assets/laura.png"

/* --- TEAM PHOTOS IMPORTS --- */
import team1Img from "../assets/team1.jpg"
import team2Img from "../assets/team2.jpg"
import team3Img from "../assets/team3.jpg"

/* --- PARTNER LOGO IMPORTS --- */
import uuInnovationLogo from "../assets/uu-innovation.png"
import uppsalahemLogo from "../assets/uppsalahem.png"
import rbuLogo from "../assets/rbu.png"
import världklassLogo from "@/assets/vku.png";

/* --- PHYSICS: Ease-Out-Quart (Smooth Glide) --- */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

function generateJitteredHearts(
  rows: number,
  cols: number,
  width = 100,
  height = 100,
  sizeRange: [number, number] = [16, 30]
) {
  const hearts: { x: number; y: number; size: number; delay: number }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = ((c + 0.5) / cols) * width
      const baseY = ((r + 0.5) / rows) * height
      const jitterX = (Math.random() - 0.5) * (width / cols)
      const jitterY = (Math.random() - 0.5) * (height / rows)
      const x = baseX + jitterX
      const y = baseY + jitterY
      const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
      const delay = Math.random() * 600
      hearts.push({ x, y, size, delay })
    }
  }
  return hearts
}

/* =========================================
   RECENT MEDIA SECTION COMPONENT
========================================= */
export function RecentMediaSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardWidthRef = useRef(0)
  const visualCardWidthRef = useRef(0)
  const paddingLeftRef = useRef(0)

  const isAnimatingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const touchStartRef = useRef(0)
  const touchStartTimeRef = useRef(0)

  const mediaItems = [
    {
      publisher: "Uppsala University",
      date: "March 2026",
      title: "Where student life meets sustainability and social impact",
      url: "https://www.uu.se/en/news/2026/2026-03-24-where-student-life-meets-sustainability-and-social-impact",
      icon: Newspaper,
      iconColor: "text-[#990000]",
      iconBg: "bg-[#990000]/10",
      iconHoverBg: "group-hover:bg-[#990000]/20",
      action: "Read article"
    },
    {
      publisher: "Ergo",
      date: "March 2026",
      title: "Students turn abandoned items into charity",
      url: "https://ergo.nu/reportage/20260320-students-turn-abandoned-items-into-charity",
      icon: Newspaper,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      iconHoverBg: "group-hover:bg-primary/20",
      action: "Read article"
    },
    {
      publisher: "RBU Uppsala",
      date: "March 2026",
      title: "Årsmöte 2026 avklarat, nygammal styrelse och donation från Rackis för barn!",
      url: "https://uppsala.rbu.se/2026/03/20/arsmote-2026-avklarat-nygammal-styrelse-och-donation-fran-rackis-for-barn/",
      icon: Heart,
      iconColor: "text-warm",
      iconBg: "bg-warm/10",
      iconHoverBg: "group-hover:bg-warm/20",
      action: "Read article"
    },
    {
      publisher: "SVT Nyheter Uppsala",
      date: "February 2026",
      title: "Här säljer de vidare studenternas gamla lakan",
      url: "https://www.svt.se/nyheter/lokalt/uppsala/sa-loste-studenterna-flyttsvinnet",
      icon: Tv,
      iconColor: "text-[#E13241]",
      iconBg: "bg-[#E13241]/10",
      iconHoverBg: "group-hover:bg-[#E13241]/20",
      action: "Watch video"
    },
    {
      publisher: "Uppsala Nya Tidning",
      date: "January 2026",
      title: "Räckis för barn öppnar second hand-butik i Uppsala",
      url: "https://www.unt.se/nyheter/uppsala/artikel/rackis-for-barn-oppnar-second-hand-butik-i-uppsala/jn11gonl",
      icon: Newspaper,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      iconHoverBg: "group-hover:bg-primary/20",
      action: "Read article"
    },
    {
      publisher: "Sveriges Radio P4 Uppland",
      date: "January 2026",
      title: "Utbytesstudenter säljer prylar och skänker pengarna till barn",
      url: "https://www.sverigesradio.se/artikel/utbytesstudenter-skanker-pengar-till-barncancerfonden",
      icon: Radio,
      iconColor: "text-warm",
      iconBg: "bg-warm/10",
      iconHoverBg: "group-hover:bg-warm/20",
      action: "Listen now"
    }
  ]

  const scrollData = [
    mediaItems[mediaItems.length - 2],
    mediaItems[mediaItems.length - 1],
    ...mediaItems,
    mediaItems[0],
    mediaItems[1]
  ]

  const START_INDEX = 2

  const getCenterOffset = (container: HTMLElement, visualWidth: number) => {
    const containerWidth = container.clientWidth
    return (containerWidth - visualWidth) / 2
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = scrollContainerRef.current
      if (container && container.firstElementChild) {
        const firstCard = container.firstElementChild as HTMLElement
        const style = window.getComputedStyle(container)
        const gap = parseFloat(style.gap) || 16

        visualCardWidthRef.current = firstCard.offsetWidth
        cardWidthRef.current = firstCard.offsetWidth + gap
        paddingLeftRef.current = parseFloat(style.paddingLeft) || 0

        const offset = getCenterOffset(container, visualCardWidthRef.current)
        container.scrollLeft = paddingLeftRef.current + (cardWidthRef.current * START_INDEX) - offset
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const checkInfiniteLoop = (container: HTMLElement) => {
    const totalWidth = cardWidthRef.current
    const visualWidth = visualCardWidthRef.current
    const paddingLeft = paddingLeftRef.current

    if (!totalWidth) return

    const offset = getCenterOffset(container, visualWidth)
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth)

    if (rawIndex >= scrollData.length - 2) {
      container.scrollLeft = paddingLeft + (totalWidth * (rawIndex - mediaItems.length)) - offset
    } else if (rawIndex <= 1) {
      container.scrollLeft = paddingLeft + (totalWidth * (rawIndex + mediaItems.length)) - offset
    }
  }

  const glideTo = (targetX: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const startX = container.scrollLeft
    const distance = targetX - startX
    const duration = 300
    const startTime = performance.now()

    isAnimatingRef.current = true
    container.style.overflowX = "hidden"
    container.style.scrollSnapType = "none"

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeOutQuart(progress)

      container.scrollLeft = startX + distance * ease

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        container.style.overflowX = "auto"
        isAnimatingRef.current = false
        rafRef.current = null
        checkInfiniteLoop(container)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      isAnimatingRef.current = false
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.overflowX = "auto"
      scrollContainerRef.current.style.scrollSnapType = "none"
      checkInfiniteLoop(scrollContainerRef.current)
    }
    touchStartRef.current = e.touches[0].clientX
    touchStartTimeRef.current = performance.now()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    const touchEnd = e.changedTouches[0].clientX
    const touchTime = performance.now() - touchStartTimeRef.current
    const diff = touchStartRef.current - touchEnd

    if (container.firstElementChild) {
      const firstCard = container.firstElementChild as HTMLElement
      const style = window.getComputedStyle(container)
      const gap = parseFloat(style.gap) || 16
      visualCardWidthRef.current = firstCard.offsetWidth
      cardWidthRef.current = firstCard.offsetWidth + gap
      paddingLeftRef.current = parseFloat(style.paddingLeft) || 0
    }

    const totalWidth = cardWidthRef.current
    const visualWidth = visualCardWidthRef.current
    const paddingLeft = paddingLeftRef.current
    const offset = getCenterOffset(container, visualWidth)

    const exactIndex = (container.scrollLeft + offset - paddingLeft) / totalWidth
    const rawIndex = Math.round(exactIndex)
    const isFlick = touchTime < 250 && Math.abs(diff) > 20

    let targetIndex = rawIndex

    if (isFlick) {
      if (diff > 0) targetIndex = Math.floor(exactIndex) + 1
      else targetIndex = Math.ceil(exactIndex) - 1
    } else {
      if (diff > 0 && exactIndex > rawIndex) targetIndex = rawIndex + 1
      else if (diff < 0 && exactIndex < rawIndex) targetIndex = rawIndex - 1
    }

    targetIndex = Math.max(0, Math.min(targetIndex, scrollData.length - 1))
    glideTo(paddingLeft + (targetIndex * totalWidth) - offset)
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    if (!isAnimatingRef.current) checkInfiniteLoop(scrollContainerRef.current)

    const totalWidth = cardWidthRef.current || 1
    const visualWidth = visualCardWidthRef.current || totalWidth
    const paddingLeft = paddingLeftRef.current
    const offset = getCenterOffset(scrollContainerRef.current, visualWidth)

    const rawIndex = Math.round((scrollContainerRef.current.scrollLeft + offset - paddingLeft) / totalWidth)

    let visualStep = rawIndex - START_INDEX
    visualStep = ((visualStep % mediaItems.length) + mediaItems.length) % mediaItems.length

    if (visualStep !== currentStep) {
      setCurrentStep(visualStep)
    }
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-10 w-32 h-32 bg-primary/5 blob"></div>

      <div className="container px-4 relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-2">
            In the news
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Recent media coverage
          </h2>
        </div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide select-none"
            style={{
              scrollSnapType: "none",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overscrollBehaviorX: "contain",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {scrollData.map((media, i) => {
              const Icon = media.icon
              return (
                <div
                  key={`${media.title}-${i}`}
                  className="shrink-0 w-[85vw] max-w-[320px] transform-gpu"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card-warm flex flex-col sm:flex-row items-start gap-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full p-5"
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${media.iconBg} flex items-center justify-center ${media.iconHoverBg} transition-colors`}>
                      <Icon className={`h-6 w-6 ${media.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{media.date}</p>
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                        {media.publisher}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{media.title}</p>
                      <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-1 transition-all">
                        {media.action}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {mediaItems.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${currentStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {mediaItems.map((media, i) => {
            const Icon = media.icon
            return (
              <a
                key={i}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-warm flex items-start gap-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-up p-5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl ${media.iconBg} flex items-center justify-center ${media.iconHoverBg} transition-colors`}>
                  <Icon className={`h-6 w-6 ${media.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">{media.date}</p>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                    {media.publisher}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{media.title}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-1 transition-all">
                    {media.action}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =========================================
   MAIN ABOUT COMPONENT
========================================= */
const About = () => {
  const { location } = useParams()
  const { location: cityParam } = useParams();
  const currentCity = (cityParam || "").toLowerCase();
  const [hearts, setHearts] = useState<{ x: number; y: number; size: number; delay: number }[]>([])

  /* --- VALUES CAROUSEL STATE --- */
  const [currentStep, setCurrentStep] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardWidthRef = useRef(0)
  const visualCardWidthRef = useRef(0)
  const paddingLeftRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const touchStartRef = useRef(0)
  const touchStartTimeRef = useRef(0)

  /* --- PARTNERS CAROUSEL STATE --- */
  const [partnerStep, setPartnerStep] = useState(0)
  const partnerScrollRef = useRef<HTMLDivElement>(null)
  const partnerCardWidthRef = useRef(0)
  const partnerVisualWidthRef = useRef(0)
  const partnerPaddingRef = useRef(0)
  const partnerAnimatingRef = useRef(false)
  const partnerRafRef = useRef<number | null>(null)
  const partnerTouchStartRef = useRef(0)
  const partnerTouchTimeRef = useRef(0)

  /* --- TEAM PHOTOS CAROUSEL STATE --- */
  const [teamStep, setTeamStep] = useState(0)
  const teamScrollRef = useRef<HTMLDivElement>(null)
  const teamCardWidthRef = useRef(0)
  const teamVisualWidthRef = useRef(0)
  const teamPaddingRef = useRef(0)
  const teamAnimatingRef = useRef(false)
  const teamRafRef = useRef<number | null>(null)
  const teamTouchStartRef = useRef(0)
  const teamTouchStartTimeRef = useRef(0)

  /* --- TEAM MEMBERS PORTRAITS CAROUSEL STATE --- */
  type TeamMember = { name: string; role: string; img: string }

  const [memberStep, setMemberStep] = useState(0)
  const memberScrollRef = useRef<HTMLDivElement>(null)
  const memberCardWidthRef = useRef(0)
  const memberVisualWidthRef = useRef(0)
  const memberPaddingRef = useRef(0)
  const memberAnimatingRef = useRef(false)
  const memberRafRef = useRef<number | null>(null)
  const memberTouchStartRef = useRef(0)
  const memberTouchStartTimeRef = useRef(0)

  const memberGroupScrollRef = useRef<HTMLDivElement>(null)
  const memberGroupCardWidthRef = useRef(0)
  const memberGroupVisualWidthRef = useRef(0)
  const memberGroupPaddingRef = useRef(0)
  const memberGroupAnimatingRef = useRef(false)
  const memberGroupRafRef = useRef<number | null>(null)
  const memberGroupTouchStartRef = useRef(0)
  const memberGroupTouchStartTimeRef = useRef(0)

  const charities = [
    {
      name: "Barncancerfonden",
      logo: undefined,
      description: "Sweden's leading organization dedicated to supporting children with cancer and their families. Through research funding and family support programs, they work to improve outcomes for young cancer patients.",
      url: "https://www.barncancerfonden.se",
      linkLabel: "barncancerfonden.se",
    },
    {
      name: "RBU",
      logo: rbuLogo,
      description: "Riksförbundet för Rörelsehindrade Barn och Ungdomar works to improve the lives of children and young people with mobility impairments in Sweden through advocacy and support programs.",
      url: "https://www.uppsala.rbu.se",
      linkLabel: "rbu.se",
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHearts(generateJitteredHearts(2, 4, 100, 100, [12, 20]))
      } else {
        setHearts(generateJitteredHearts(3, 5, 100, 100, [16, 30]))
      }

      if (scrollContainerRef.current) {
        const firstCard = scrollContainerRef.current.firstElementChild as HTMLElement
        const style = window.getComputedStyle(scrollContainerRef.current)
        const gap = parseFloat(style.gap) || 16
        visualCardWidthRef.current = firstCard.offsetWidth
        cardWidthRef.current = firstCard.offsetWidth + gap
        paddingLeftRef.current = parseFloat(style.paddingLeft) || 0
      }

      if (partnerScrollRef.current) {
        const firstP = partnerScrollRef.current.firstElementChild as HTMLElement
        const styleP = window.getComputedStyle(partnerScrollRef.current)
        const gapP = parseFloat(styleP.gap) || 16
        partnerVisualWidthRef.current = firstP.offsetWidth
        partnerCardWidthRef.current = firstP.offsetWidth + gapP
        partnerPaddingRef.current = parseFloat(styleP.paddingLeft) || 0
      }

      if (teamScrollRef.current) {
        const c = teamScrollRef.current
        const styleT = window.getComputedStyle(c)
        teamPaddingRef.current = parseFloat(styleT.paddingLeft) || 0
        teamVisualWidthRef.current = c.clientWidth
        teamCardWidthRef.current = c.clientWidth
      }

      if (memberScrollRef.current) {
        const firstCard = memberScrollRef.current.firstElementChild as HTMLElement
        const styleM = window.getComputedStyle(memberScrollRef.current)
        const gapM = parseFloat(styleM.gap) || 16
        memberVisualWidthRef.current = firstCard.offsetWidth
        memberCardWidthRef.current = firstCard.offsetWidth + gapM
        memberPaddingRef.current = parseFloat(styleM.paddingLeft) || 0
      }

      if (memberGroupScrollRef.current) {
        const c = memberGroupScrollRef.current
        const styleG = window.getComputedStyle(c)
        memberGroupPaddingRef.current = parseFloat(styleG.paddingLeft) || 0
        memberGroupVisualWidthRef.current = c.clientWidth
        memberGroupCardWidthRef.current = c.clientWidth
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const values = [
    {
      icon: Recycle,
      title: "Sustainability",
      description: "We believe in reducing waste and giving items a second chance at life.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Every action we take is driven by our desire to help children in need.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Built by students, for students. We understand the student life.",
    },
    {
      icon: Award,
      title: "Transparency",
      description: "100% of our profits go directly to Barncancerfonden and RBU.",
    },
  ]

  const partners = [
    {
      name: "Uppsala University Innovation",
      logo: uuInnovationLogo,
      customClass: "h-32 md:h-36 scale-125",
      description: "Uppsala University Innovation provides guidance and resources to help Swecircle expand its reach and positive impact.",
      url: "https://www.uuinnovation.uu.se",
    },
    {
      name: "Världsklass Uppsala",
      logo: världklassLogo,
      // Added a custom scale for the square logo
      customClass: "h-32 md:h-36 scale-125",
      description: "Världsklass Uppsala provides generous financial support to help Swecircle maximize its impact, scale operations, and accelerate sustainable growth.",
      url: "https://varldsklassuppsala.se/",
    },
    {
      name: "Uppsalahem",
      logo: uppsalahemLogo,
      customClass: "h-20 md:h-24",
      description: "Generously provides access to storage units, enabling us to collect and sell items directly at student housing locations.",
      url: "https://www.uppsalahem.se",
    },
  ]

  // 1. Define the 3 core members
  const boardMembers = [
    { name: "Jacob Lehmann", role: "President & Founder", img: jacobImg },
    { name: "Elias Foppa", role: "Vice President & Treasurer", img: eliasImg },
    { name: "Lea Poewe", role: "Secretary & Head of Marketing", img: leaImg },
  ];

  // 2. Filter dynamically based on the URL
  const teamMembers =
    currentCity === "lund"
      ? boardMembers
      : [
        ...boardMembers,
        { name: "Lenka Benková", role: "Founding Member", img: lenkaImg },
        { name: "Lukas Idman", role: "Founding Member", img: lukasImg },
        { name: "Laura Fuertes", role: "Donation and Staff Management", img: lauraImg },
      ];

  // 3. Chunk into groups of 3 for the desktop carousel
  const chunkInto = <T,>(arr: T[], size: number) => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  };

  // Each desktop slide is exactly 3 cards; pad with nulls to keep layout stable
  const memberGroups = chunkInto(teamMembers, 3).map((g) => {
    const padded: any[] = [...g];
    while (padded.length < 3) padded.push(null);
    return padded;
  });

  // --- TEAM PHOTOS DATA ---
  const teamPhotos = [
    { src: team1Img, alt: "Swecircle volunteers 1" },
    { src: team2Img, alt: "Swecircle volunteers 2" },
    { src: team3Img, alt: "Swecircle volunteers 3" },
  ];


  const isPartnerSingle = partners.length <= 1

  /* --- DATA BUFFERS --- */
  const valuesScrollData = [values[2], values[3], ...values, values[0], values[1]]
  const VALUES_START = 2

  const partnersScrollData = isPartnerSingle
    ? partners
    : [
      partners[(partners.length - 2) % partners.length],
      partners[(partners.length - 1) % partners.length],
      ...partners,
      partners[0],
      partners[1 % partners.length],
    ]
  const PARTNER_START = isPartnerSingle ? 0 : 2

  const isTeamSingle = teamPhotos.length <= 1
  const teamScrollData = isTeamSingle
    ? teamPhotos
    : [
      teamPhotos[(teamPhotos.length - 2) % teamPhotos.length],
      teamPhotos[(teamPhotos.length - 1) % teamPhotos.length],
      ...teamPhotos,
      teamPhotos[0],
      teamPhotos[1 % teamPhotos.length],
    ]
  const TEAM_START = isTeamSingle ? 0 : 2

  const isMemberSingle = teamMembers.length <= 1
  const memberScrollData = isMemberSingle
    ? teamMembers
    : [
      teamMembers[(teamMembers.length - 2) % teamMembers.length],
      teamMembers[(teamMembers.length - 1) % teamMembers.length],
      ...teamMembers,
      teamMembers[0],
      teamMembers[1 % teamMembers.length],
    ]
  const MEMBER_START = isMemberSingle ? 0 : 2

  const isMemberGroupSingle = memberGroups.length <= 1
  const memberGroupScrollData = isMemberGroupSingle
    ? memberGroups
    : [
      memberGroups[(memberGroups.length - 2) % memberGroups.length],
      memberGroups[(memberGroups.length - 1) % memberGroups.length],
      ...memberGroups,
      memberGroups[0],
      memberGroups[1 % memberGroups.length],
    ]
  const MEMBERGROUP_START = isMemberGroupSingle ? 0 : 2

  const getCenterOffset = (container: HTMLElement, visualWidth: number) => {
    const containerWidth = container.clientWidth
    return (containerWidth - visualWidth) / 2
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const c = scrollContainerRef.current
        const fc = c.firstElementChild as HTMLElement
        const s = window.getComputedStyle(c)
        visualCardWidthRef.current = fc.offsetWidth
        cardWidthRef.current = fc.offsetWidth + (parseFloat(s.gap) || 16)
        paddingLeftRef.current = parseFloat(s.paddingLeft) || 0
        const off = getCenterOffset(c, visualCardWidthRef.current)
        c.scrollLeft = paddingLeftRef.current + (cardWidthRef.current * VALUES_START) - off
      }

      if (partnerScrollRef.current) {
        const c = partnerScrollRef.current
        const fc = c.firstElementChild as HTMLElement
        const s = window.getComputedStyle(c)
        partnerVisualWidthRef.current = fc.offsetWidth
        partnerCardWidthRef.current = fc.offsetWidth + (parseFloat(s.gap) || 16)
        partnerPaddingRef.current = parseFloat(s.paddingLeft) || 0
        const off = getCenterOffset(c, partnerVisualWidthRef.current)
        const idx = isPartnerSingle ? 0 : PARTNER_START
        c.scrollLeft = partnerPaddingRef.current + (partnerCardWidthRef.current * idx) - off
      }

      if (teamScrollRef.current) {
        const c = teamScrollRef.current
        const off = getCenterOffset(c, teamVisualWidthRef.current)
        c.scrollLeft = teamPaddingRef.current + (teamCardWidthRef.current * TEAM_START) - off
        setTeamStep(0)
      }

      if (memberScrollRef.current) {
        const c = memberScrollRef.current
        const fc = c.firstElementChild as HTMLElement
        const s = window.getComputedStyle(c)
        memberVisualWidthRef.current = fc.offsetWidth
        memberCardWidthRef.current = fc.offsetWidth + (parseFloat(s.gap) || 16)
        memberPaddingRef.current = parseFloat(s.paddingLeft) || 0
        const off = getCenterOffset(c, memberVisualWidthRef.current)
        c.scrollLeft = memberPaddingRef.current + (memberCardWidthRef.current * MEMBER_START) - off
        setMemberStep(0)
      }

      if (memberGroupScrollRef.current) {
        const c = memberGroupScrollRef.current
        const off = getCenterOffset(c, memberGroupVisualWidthRef.current)
        c.scrollLeft = memberGroupPaddingRef.current + (memberGroupCardWidthRef.current * MEMBERGROUP_START) - off
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [partners.length, isPartnerSingle, isTeamSingle, isMemberSingle, isMemberGroupSingle])

  const checkLoop = (
    container: HTMLElement,
    totalWidth: number,
    visualWidth: number,
    paddingLeft: number,
    dataLen: number,
    realLen: number,
    isSingle: boolean
  ) => {
    if (isSingle) return
    if (!totalWidth) return

    const offset = getCenterOffset(container, visualWidth)
    const rawIndex = Math.round((container.scrollLeft + offset - paddingLeft) / totalWidth)

    if (rawIndex >= dataLen - 2) {
      container.scrollLeft = paddingLeft + (totalWidth * (rawIndex - realLen)) - offset
    } else if (rawIndex <= 1) {
      container.scrollLeft = paddingLeft + (totalWidth * (rawIndex + realLen)) - offset
    }
  }

  const glide = (
    container: HTMLElement,
    targetX: number,
    animRef: React.MutableRefObject<boolean>,
    localRafRef: React.MutableRefObject<number | null>,
    onComplete?: () => void
  ) => {
    if (localRafRef.current) cancelAnimationFrame(localRafRef.current)

    const startX = container.scrollLeft
    const distance = targetX - startX
    const duration = 300
    const startTime = performance.now()

    animRef.current = true
    container.style.scrollSnapType = "none"
    container.style.overflowX = "hidden"

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeOutQuart(progress)

      container.scrollLeft = startX + distance * ease

      if (progress < 1) {
        localRafRef.current = requestAnimationFrame(animate)
      } else {
        container.style.overflowX = "auto"
        animRef.current = false
        localRafRef.current = null
        if (onComplete) onComplete()
      }
    }

    localRafRef.current = requestAnimationFrame(animate)
  }

  const handleTouchEndGeneric = (
    e: React.TouchEvent,
    container: HTMLElement,
    touchStart: number,
    touchTimeStart: number,
    totalWidth: number,
    visualWidth: number,
    paddingLeft: number,
    dataLen: number,
    isSingle: boolean,
    animRef: React.MutableRefObject<boolean>,
    localRafRef: React.MutableRefObject<number | null>
  ) => {
    if (isSingle || !container) return

    const touchEnd = e.changedTouches[0].clientX
    const touchTime = performance.now() - touchTimeStart
    const diff = touchStart - touchEnd

    const offset = getCenterOffset(container, visualWidth)
    const exactIndex = (container.scrollLeft + offset - paddingLeft) / totalWidth
    const rawIndex = Math.round(exactIndex)
    const isFlick = touchTime < 250 && Math.abs(diff) > 20

    let targetIndex = rawIndex

    if (isFlick) {
      if (diff > 0) targetIndex = Math.floor(exactIndex) + 1
      else targetIndex = Math.ceil(exactIndex) - 1
    } else {
      if (diff > 0 && exactIndex > rawIndex) targetIndex = rawIndex + 1
      else if (diff < 0 && exactIndex < rawIndex) targetIndex = rawIndex - 1
    }

    targetIndex = Math.max(0, Math.min(targetIndex, dataLen - 1))

    glide(
      container,
      paddingLeft + (targetIndex * totalWidth) - offset,
      animRef,
      localRafRef,
      () => { }
    )
  }

  const handleValuesScroll = () => {
    if (!scrollContainerRef.current) return
    if (!isAnimatingRef.current) {
      checkLoop(
        scrollContainerRef.current,
        cardWidthRef.current,
        visualCardWidthRef.current,
        paddingLeftRef.current,
        valuesScrollData.length,
        values.length,
        false
      )
    }

    const offset = getCenterOffset(scrollContainerRef.current, visualCardWidthRef.current)
    const rawIndex = Math.round(
      (scrollContainerRef.current.scrollLeft + offset - paddingLeftRef.current) / cardWidthRef.current
    )

    let visualStep = rawIndex - VALUES_START
    visualStep = ((visualStep % values.length) + values.length) % values.length

    if (visualStep !== currentStep) {
      setCurrentStep(visualStep)
    }
  }

  const handleValuesTouchStart = (e: React.TouchEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    isAnimatingRef.current = false
    touchStartRef.current = e.touches[0].clientX
    touchStartTimeRef.current = performance.now()
  }

  const handleValuesTouchEnd = (e: React.TouchEvent) => {
    handleTouchEndGeneric(
      e,
      scrollContainerRef.current!,
      touchStartRef.current,
      touchStartTimeRef.current,
      cardWidthRef.current,
      visualCardWidthRef.current,
      paddingLeftRef.current,
      valuesScrollData.length,
      false,
      isAnimatingRef,
      rafRef
    )
  }

  const handlePartnersScroll = () => {
    if (!partnerScrollRef.current || isPartnerSingle) return
    if (!partnerAnimatingRef.current) {
      checkLoop(
        partnerScrollRef.current,
        partnerCardWidthRef.current,
        partnerVisualWidthRef.current,
        partnerPaddingRef.current,
        partnersScrollData.length,
        partners.length,
        isPartnerSingle
      )
    }

    const offset = getCenterOffset(partnerScrollRef.current, partnerVisualWidthRef.current)
    const rawIndex = Math.round(
      (partnerScrollRef.current.scrollLeft + offset - partnerPaddingRef.current) / partnerCardWidthRef.current
    )

    let visualStep = rawIndex - PARTNER_START
    visualStep = ((visualStep % partners.length) + partners.length) % partners.length

    if (visualStep !== partnerStep) {
      setPartnerStep(visualStep)
    }
  }

  const handlePartnersTouchStart = (e: React.TouchEvent) => {
    if (isPartnerSingle) return
    if (partnerRafRef.current) cancelAnimationFrame(partnerRafRef.current)
    partnerRafRef.current = null
    partnerAnimatingRef.current = false
    partnerTouchStartRef.current = e.touches[0].clientX
    partnerTouchTimeRef.current = performance.now()
  }

  const handlePartnersTouchEnd = (e: React.TouchEvent) => {
    if (isPartnerSingle) return
    handleTouchEndGeneric(
      e,
      partnerScrollRef.current!,
      partnerTouchStartRef.current,
      partnerTouchTimeRef.current,
      partnerCardWidthRef.current,
      partnerVisualWidthRef.current,
      partnerPaddingRef.current,
      partnersScrollData.length,
      isPartnerSingle,
      partnerAnimatingRef,
      partnerRafRef
    )
  }

  const handleTeamScroll = () => {
    if (!teamScrollRef.current) return
    const c = teamScrollRef.current

    if (!teamAnimatingRef.current) {
      checkLoop(
        c,
        teamCardWidthRef.current,
        teamVisualWidthRef.current,
        teamPaddingRef.current,
        teamScrollData.length,
        teamPhotos.length,
        isTeamSingle
      )
    }

    const offset = getCenterOffset(c, teamVisualWidthRef.current)
    const rawIndex = Math.round((c.scrollLeft + offset - teamPaddingRef.current) / teamCardWidthRef.current)

    let visualStep = rawIndex - TEAM_START
    visualStep = ((visualStep % teamPhotos.length) + teamPhotos.length) % teamPhotos.length

    if (visualStep !== teamStep) {
      setTeamStep(visualStep)
    }
  }

  const handleTeamTouchStart = (e: React.TouchEvent) => {
    if (isTeamSingle) return
    if (teamRafRef.current) cancelAnimationFrame(teamRafRef.current)
    teamRafRef.current = null
    teamAnimatingRef.current = false
    teamTouchStartRef.current = e.touches[0].clientX
    teamTouchStartTimeRef.current = performance.now()
  }

  const handleTeamTouchEnd = (e: React.TouchEvent) => {
    if (isTeamSingle) return
    handleTouchEndGeneric(
      e,
      teamScrollRef.current!,
      teamTouchStartRef.current,
      teamTouchStartTimeRef.current,
      teamCardWidthRef.current,
      teamVisualWidthRef.current,
      teamPaddingRef.current,
      teamScrollData.length,
      isTeamSingle,
      teamAnimatingRef,
      teamRafRef
    )
  }

  const getTeamRawIndex = () => {
    const c = teamScrollRef.current
    if (!c) return TEAM_START
    const offset = getCenterOffset(c, teamVisualWidthRef.current)
    return Math.round((c.scrollLeft + offset - teamPaddingRef.current) / teamCardWidthRef.current)
  }

  const scrollTeamToRaw = (rawIdx: number) => {
    const c = teamScrollRef.current
    if (!c) return
    const offset = getCenterOffset(c, teamVisualWidthRef.current)
    glide(
      c,
      teamPaddingRef.current + (rawIdx * teamCardWidthRef.current) - offset,
      teamAnimatingRef,
      teamRafRef,
      () => {
        checkLoop(
          c,
          teamCardWidthRef.current,
          teamVisualWidthRef.current,
          teamPaddingRef.current,
          teamScrollData.length,
          teamPhotos.length,
          isTeamSingle
        )
      }
    )
  }

  const goTeamPrev = () => {
    if (isTeamSingle) return
    scrollTeamToRaw(getTeamRawIndex() - 1)
  }

  const goTeamNext = () => {
    if (isTeamSingle) return
    scrollTeamToRaw(getTeamRawIndex() + 1)
  }

  const scrollTeamTo = (visualIdx: number) => {
    if (isTeamSingle) return
    const raw = getTeamRawIndex()
    const currentVisual = ((raw - TEAM_START) % teamPhotos.length + teamPhotos.length) % teamPhotos.length
    const delta = visualIdx - currentVisual
    scrollTeamToRaw(raw + delta)
  }

  const handleMembersScroll = () => {
    if (!memberScrollRef.current) return
    if (!memberAnimatingRef.current) {
      checkLoop(
        memberScrollRef.current,
        memberCardWidthRef.current,
        memberVisualWidthRef.current,
        memberPaddingRef.current,
        memberScrollData.length,
        teamMembers.length,
        isMemberSingle
      )
    }

    const offset = getCenterOffset(memberScrollRef.current, memberVisualWidthRef.current)
    const rawIndex = Math.round(
      (memberScrollRef.current.scrollLeft + offset - memberPaddingRef.current) / memberCardWidthRef.current
    )

    let visualStep = rawIndex - MEMBER_START
    visualStep = ((visualStep % teamMembers.length) + teamMembers.length) % teamMembers.length

    if (visualStep !== memberStep) {
      setMemberStep(visualStep)
    }
  }

  const handleMembersTouchStart = (e: React.TouchEvent) => {
    if (isMemberSingle) return
    if (memberRafRef.current) cancelAnimationFrame(memberRafRef.current)
    memberRafRef.current = null
    memberAnimatingRef.current = false
    memberTouchStartRef.current = e.touches[0].clientX
    memberTouchStartTimeRef.current = performance.now()
  }

  const handleMembersTouchEnd = (e: React.TouchEvent) => {
    if (isMemberSingle) return
    handleTouchEndGeneric(
      e,
      memberScrollRef.current!,
      memberTouchStartRef.current,
      memberTouchStartTimeRef.current,
      memberCardWidthRef.current,
      memberVisualWidthRef.current,
      memberPaddingRef.current,
      memberScrollData.length,
      isMemberSingle,
      memberAnimatingRef,
      memberRafRef
    )
  }

  const handleMemberGroupScroll = () => {
    if (!memberGroupScrollRef.current) return
    const c = memberGroupScrollRef.current

    if (!memberGroupAnimatingRef.current) {
      checkLoop(
        c,
        memberGroupCardWidthRef.current,
        memberGroupVisualWidthRef.current,
        memberGroupPaddingRef.current,
        memberGroupScrollData.length,
        memberGroups.length,
        isMemberGroupSingle
      )
    }
  }

  const getMemberGroupRawIndex = () => {
    const c = memberGroupScrollRef.current
    if (!c) return MEMBERGROUP_START
    const offset = getCenterOffset(c, memberGroupVisualWidthRef.current)
    return Math.round(
      (c.scrollLeft + offset - memberGroupPaddingRef.current) / memberGroupCardWidthRef.current
    )
  }

  const scrollMemberGroupToRaw = (rawIdx: number) => {
    const c = memberGroupScrollRef.current
    if (!c) return
    const offset = getCenterOffset(c, memberGroupVisualWidthRef.current)
    glide(
      c,
      memberGroupPaddingRef.current + (rawIdx * memberGroupCardWidthRef.current) - offset,
      memberGroupAnimatingRef,
      memberGroupRafRef,
      () => {
        checkLoop(
          c,
          memberGroupCardWidthRef.current,
          memberGroupVisualWidthRef.current,
          memberGroupPaddingRef.current,
          memberGroupScrollData.length,
          memberGroups.length,
          isMemberGroupSingle
        )
      }
    )
  }

  const goMemberGroupPrev = () => {
    if (isMemberGroupSingle) return
    scrollMemberGroupToRaw(getMemberGroupRawIndex() - 1)
  }

  const goMemberGroupNext = () => {
    if (isMemberGroupSingle) return
    scrollMemberGroupToRaw(getMemberGroupRawIndex() + 1)
  }

  const handleMemberGroupTouchStart = (e: React.TouchEvent) => {
    if (isMemberGroupSingle) return
    if (memberGroupRafRef.current) cancelAnimationFrame(memberGroupRafRef.current)
    memberGroupRafRef.current = null
    memberGroupAnimatingRef.current = false
    memberGroupTouchStartRef.current = e.touches[0].clientX
    memberGroupTouchStartTimeRef.current = performance.now()
  }

  const handleMemberGroupTouchEnd = (e: React.TouchEvent) => {
    if (isMemberGroupSingle) return
    handleTouchEndGeneric(
      e,
      memberGroupScrollRef.current!,
      memberGroupTouchStartRef.current,
      memberGroupTouchStartTimeRef.current,
      memberGroupCardWidthRef.current,
      memberGroupVisualWidthRef.current,
      memberGroupPaddingRef.current,
      memberGroupScrollData.length,
      isMemberGroupSingle,
      memberGroupAnimatingRef,
      memberGroupRafRef
    )
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient py-8 md:py-12 relative overflow-hidden min-h-[30vh] flex flex-col items-center justify-center">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 blob animate-float"></div>
        <div className="absolute bottom-5 left-5 w-24 h-24 bg-warm/10 blob animate-wiggle"></div>

        {hearts.map((h, i) => (
          <Heart
            key={i}
            className="absolute text-warm/30 animate-float fill-current"
            style={{
              top: `${h.y}%`,
              left: `${h.x}%`,
              width: `${h.size}px`,
              height: `${h.size}px`,
              animationDelay: `${h.delay}ms`,
            }}
          />
        ))}

        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
              About Swecircle
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-100 leading-relaxed">
              As new students in Uppsala, we struggled to find second-hand essentials, while others moving out were throwing away perfectly good items. What started as "Rackis för Barn" in Uppsala has now evolved into Swecircle, and we've been working ever since to tackle these problems across student cities.
            </p>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-8 md:py-12">
        <div className="container-narrow">
          <div className="max-w-none">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">
              Who we are
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-6">
              More than just a second-hand store
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Swecircle is a student-run non-profit organization designed specifically for students to exchange second-hand items during move-ins and move-outs. What makes us unique is that we collect and sell second-hand items directly at student housing locations, making settling into your new city more convenient and sustainable.
              </p>
              <p>
                When students move out, instead of throwing away items they donate them to us. We collect many items like bedding, curtains, bikes, kitchen equipment, lamps, small furniture, decoration, and much more. Then, students moving into new places can find everything they need at fair prices.
              </p>
              <p className="text-foreground font-semibold">
                All profits from sales go directly to Barncancerfonden and RBU, supporting children and their families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW Press Mention using the dedicated component */}
      <RecentMediaSection />

      {/* History */}
      <section className="py-8 md:py-12 bg-section-alt">
        <div className="container-narrow text-center">
          <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-2">
            Our history
          </span>
          <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-3">
            From Rackis för Barn to Swecircle
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            We started our journey in Uppsala under the name <span className="font-semibold text-foreground">Rackis för Barn</span>. "Rackis" is short for Rackarbergsgatan, the student housing area where we began, and "Barn" means children in Swedish, reflecting our mission to support children in need.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            As we expanded beyond Uppsala, we needed a name that reflected our wider
            mission. <span className="font-semibold text-foreground">Swecircle</span>{" "}
            combines “Swe” for Sweden with “circle” for the sustainable cycle of donating,
            reusing, and buying second-hand items. The name captures our vision of giving
            items a longer life while creating positive impact for people and the planet.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-8 md:py-12 bg-section-warm">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">
              The people behind it
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-4">
              Our Team
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
              We are a group of dedicated students who believe in sustainability, community, and making a difference.
            </p>
          </div>

          {/* Portraits - Desktop */}
          <div className="hidden md:block">
            <div className="relative max-w-4xl mx-auto">
              <button
                type="button"
                onClick={goMemberGroupPrev}
                className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full bg-white shadow hover:shadow-md transition z-10 aria-label='Previous team members'"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>

              <div className="overflow-hidden">
                <div
                  ref={memberGroupScrollRef}
                  onScroll={handleMemberGroupScroll}
                  onTouchStart={handleMemberGroupTouchStart}
                  onTouchEnd={handleMemberGroupTouchEnd}
                  className="flex gap-0 px-0 overflow-x-auto md:overflow-x-hidden scrollbar-hide select-none"
                  style={{
                    scrollSnapType: "none",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    overscrollBehaviorX: "contain",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {memberGroupScrollData.map((group, gi) => (
                    <div key={`member-group-${gi}`} className="shrink-0 w-full">
                      <div className="grid grid-cols-3 gap-4">
                        {group.map((m, mi) =>
                          m ? (
                            <div key={`${m.name}-${mi}`} className="card-warm text-center">
                              <img
                                src={m.img}
                                alt={m.name}
                                className="mx-auto w-24 h-24 object-cover rounded-full mb-3"
                                draggable={false}
                              />
                              <h3 className="text-base font-bold text-foreground">{m.name}</h3>
                              <p className="text-sm text-muted-foreground">{m.role}</p>
                            </div>
                          ) : (
                            <div key={`empty-${mi}`} className="opacity-0 pointer-events-none card-warm"></div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={goMemberGroupNext}
                className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full bg-white shadow hover:shadow-md transition z-10 aria-label='Next team members'"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>

          {/* Portraits - Mobile */}
          <div className="md:hidden relative">
            <div
              ref={memberScrollRef}
              onScroll={handleMembersScroll}
              onTouchStart={handleMembersTouchStart}
              onTouchEnd={handleMembersTouchEnd}
              className="flex overflow-x-auto pb-6 gap-4 px-4 scrollbar-hide select-none"
              style={{
                scrollSnapType: "none",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {memberScrollData.map((m, i) => (
                <div
                  key={`${m.name}-${i}`}
                  className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <div className="card-warm text-center">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="mx-auto w-24 h-24 object-cover rounded-full mb-3"
                      draggable={false}
                    />
                    <h3 className="text-base font-bold text-foreground">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-2">
              {teamMembers.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${memberStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                    }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-base text-muted-foreground max-w-2xl mx-auto">
            We have many amazing volunteers who contribute their time and effort to make Swecircle possible.
          </p>

          {/* --- TEAM PHOTOS CAROUSEL --- */}
          <div className="mt-10">
            <div className="relative max-w-5xl mx-auto">
              <button
                type="button"
                onClick={goTeamPrev}
                className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full bg-white shadow hover:shadow-md transition z-10 aria-label='Previous photo'"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>

              <div className="overflow-hidden rounded-2xl">
                <div
                  ref={teamScrollRef}
                  onScroll={handleTeamScroll}
                  onTouchStart={handleTeamTouchStart}
                  onTouchEnd={handleTeamTouchEnd}
                  className="flex gap-0 px-0 overflow-x-auto md:overflow-x-hidden scrollbar-hide select-none"
                  style={{
                    scrollSnapType: "none",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    overscrollBehaviorX: "contain",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {teamScrollData.map((p, i) => (
                    <div key={`${p.alt}-${i}`} className="shrink-0 w-full">
                      <img src={p.src} alt={p.alt} className="w-full h-auto block" draggable={false} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={goTeamNext}
                className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full bg-white shadow hover:shadow-md transition z-10 aria-label='Next photo'"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {teamPhotos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTeamTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${teamStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                    }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CHARITY SECTION --- */}
      <section id="charities" className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-3">
                Our cause
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Supporting children in need
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {charities.map((charity) => (
                <div
                  key={charity.name}
                  className="card-warm hover:shadow-lg transition-shadow flex flex-col relative overflow-hidden"
                >
                  {charity.logo && (
                    <img
                      src={charity.logo}
                      alt=""
                      aria-hidden="true"
                      className="absolute -bottom-2.5 -right-2.5 w-36 md:w-40 object-contain opacity-[0.09] pointer-events-none select-none"
                    />
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-3 relative">
                    {charity.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 relative">
                    {charity.description}
                  </p>
                  <a
                    href={charity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary text-sm font-semibold hover:underline relative"
                  >
                    Learn more at {charity.linkLabel}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10">
                <Heart className="h-6 w-6 text-warm fill-current" />
                <p className="font-display text-lg font-bold text-foreground">
                  100% of profits go to these charities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 overflow-hidden bg-section-alt">
        <div className="container">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-3">
              What drives us
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold text-foreground">
              Our Values
            </h2>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="card-warm text-center bg-white"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="md:hidden relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleValuesScroll}
              onTouchStart={handleValuesTouchStart}
              onTouchEnd={handleValuesTouchEnd}
              className="flex overflow-x-auto pb-8 gap-4 px-4 scrollbar-hide select-none"
              style={{
                scrollSnapType: "none",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {valuesScrollData.map((value, i) => (
                <div
                  key={`${value.title}-${i}`}
                  className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <div className="card-warm text-center h-full flex flex-col items-center justify-center bg-white">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-2">
              {values.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${currentStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS SECTION --- */}
      <section className="pt-20 pb-20 md:pt-32 md:pb-32 bg-section-light">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-3">
              In collaboration with
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Our Supportive Partners
            </h2>
          </div>

          <div className="md:hidden relative w-full flex flex-col items-center">
            <div
              ref={partnerScrollRef}
              onScroll={handlePartnersScroll}
              onTouchStart={handlePartnersTouchStart}
              onTouchEnd={handlePartnersTouchEnd}
              className={`flex pb-8 gap-4 px-4 scrollbar-hide select-none w-full ${isPartnerSingle ? "justify-center overflow-hidden" : "overflow-x-auto justify-start"
                }`}
              style={{
                scrollSnapType: "none",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overscrollBehaviorX: "contain",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {partnersScrollData.map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="shrink-0 w-[75vw] max-w-[300px] transform-gpu"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center h-full p-6 rounded-2xl bg-white/50 backdrop-blur border border-transparent active:scale-95 transition-transform"
                  >
                    <div className="flex items-center justify-center w-full h-40 mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className={`w-auto max-w-full object-contain ${partner.customClass}`}
                      />
                    </div>
                    <p className="text-muted-foreground text-center text-sm">
                      {partner.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>

            {!isPartnerSingle && (
              <div className="flex justify-center gap-2 mt-2">
                {partners.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${partnerStep === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-wrap justify-center gap-16 items-center">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center max-w-xs hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-center w-64 h-40 mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`w-auto max-w-full object-contain ${partner.customClass}`}
                  />
                </div>
                <p className="text-muted-foreground text-center">{partner.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About