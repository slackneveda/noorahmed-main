"use client" // Required for Framer Motion hooks and event handlers

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiBriefcase, FiDownload } from "react-icons/fi"
import { Button } from "@/components/ui/button"

// --- Data Configuration ---
// Consider moving this to a separate data file (e.g., data/experience.js)
const experiences = [
  {
    title: "Associate Engineer – Full Stack & AI Integration",
    company: "Prismware Technologies",
    period: "June 2025 - Present",
    location: "Remote – Toronto, Canada",
    description:
      "Building full-stack AI-powered SaaS platforms with Next.js (App Router, SSR/SSG) and Python FastAPI. Integrating Anthropic Claude and LangChain into production apps with streaming chat (SSE), multi-tenant PostgreSQL data models, and Redis caching. Collaborating across distributed Agile teams from requirements through deployment.",
    skills: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Anthropic Claude",
      "LangChain",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Young Dev",
    period: "July 2024",
    location: "Lahore, Pakistan",
    description:
      "Built full-stack web applications with React.js / Redux Toolkit frontends and Django REST Framework backends. Implemented JWT authentication, custom permissions, optimized PostgreSQL schemas via Django ORM, and integrated third-party APIs and payment gateways. Maintained quality through GitHub PR reviews and feature-branch workflow.",
    skills: [
      "React.js",
      "Redux Toolkit",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "JWT",
      "Git",
    ],
  },
  {
    title: "Frontend Developer",
    company: "XcelTK",
    period: "March 2023 - June 2024",
    location: "Lahore, Pakistan",
    description:
      "Engineered 6+ production React.js SaaS applications with Redux Toolkit and React Query. Translated Figma designs into pixel-perfect, accessible UIs with Tailwind CSS and Material UI. Drove a 35% reduction in load time via code splitting and memoization, and cut frontend bug reports by 25% by introducing React Testing Library standards.",
    skills: [
      "React.js",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
      "Material UI",
      "Axios",
      "Jest",
      "React Testing Library",
    ],
  },
]

// --- Animation Variants ---
// Reusing similar variants from the Skills section for consistency
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

// Stagger container for the timeline items
const timelineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the appearance of each experience item
      delayChildren: 0.2,
    },
  },
}

// Variants for each individual timeline item (the card + dot container)
const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 }, // Slide in from left slightly
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Refined easing
    },
  },
}
// Variant specific for items appearing on the right on desktop
const timelineItemVariantsRight = {
  hidden: { opacity: 0, x: 30 }, // Slide in from right slightly
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}


// --- The Component ---
const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-background">
      {/* Subtle background difference if needed, or keep same as Skills */}
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>
          <p className="mx-auto max-w-[750px] text-lg text-muted-foreground md:text-xl">
            Highlights from my career path and key accomplishments.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto"> {/* Increased max-width for better spacing */}
          {/* The Vertical Timeline Line */}
          <div
            className="absolute left-4 sm:left-8 md:left-1/2 w-1 h-full origin-top -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20"
            aria-hidden="true" // Decorative element
          />

          {/* Stagger wrapper for timeline items */}
          <motion.div
            variants={timelineContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of container is visible
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                // Apply different variants based on position for alternating slide-in
                variants={index % 2 === 0 ? timelineItemVariants : timelineItemVariantsRight}
                className="relative mb-12 md:mb-16 group" // Add group for potential hover effects
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-1 left-4 sm:left-8 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center
                              ring-4 ring-background // Creates separation from the line
                              bg-muted border-2 border-primary/50
                              transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 // Subtle hover on dot
                              -translate-x-1/2 // Center the dot on the line
                              z-10`} // Ensure dot is above the line
                >
                  <FiBriefcase className="h-4 w-4 text-primary" />
                </div>

                {/* Content Card - positioned left/right on desktop */}
                <div
                  className={`ml-12 sm:ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0
                      ? "md:mr-[calc(50%+2rem)]"
                      : "md:ml-[calc(50%+2rem)]"
                  }`}
                >
                  {/* Card Styling */}
                  <Card className="border border-border/30 transition-shadow duration-300 shadow-sm hover:shadow-md hover:border-primary/40 bg-card/90 backdrop-blur-sm">
                    <CardContent className={`p-4 sm:p-6 ${index % 2 === 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} flex flex-col`}>
                      {/* Header */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          {exp.period}
                          {exp.location ? ` \u00b7 ${exp.location}` : ""}
                        </p>
                        <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-base font-medium text-primary/90">{exp.company}</p>
                      </div>
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                      {/* Skills Badges */}
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                        {exp.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="font-normal text-xs"> {/* Using secondary variant for softer look */}
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Certificate Download Button - only for Young Dev experience */}
                      {exp.company === "Young Dev" && (
                        <div className={`mt-4 ${index % 2 === 0 ? 'md:self-end' : 'md:self-start'} self-start`}>
                          <Button variant="outline" size="sm" asChild className="flex items-center gap-1 text-xs sm:text-sm">
                            <a href="/youngdev.pdf" download="Young_Dev_Certificate.pdf">
                              <FiDownload size={14} className="mr-1" /> Download Certificate
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience