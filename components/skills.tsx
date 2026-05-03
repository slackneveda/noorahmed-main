"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card" // Assuming these are Shadcn UI components
import { FaDatabase, FaGlobe, FaRobot } from "react-icons/fa"
import { FiLayout, FiServer, FiGitBranch, FiStar } from "react-icons/fi"
// Assuming HoveringCard adds a subtle lift/scale effect on hover.
// If not, you might need to implement that or use Framer Motion's `whileHover`.
import { HoveringCard } from "@/components/ui/hovering-card" // Make sure this component exists and works

// --- Data Configuration ---
// Consider moving this to a separate file if it grows larger
const skillCategories = [
  {
    title: "Frontend Development",
    icon: FiLayout,
    skills: [
      "Next.js 14 (App Router, SSR, SSG, RSC)",
      "React.js",
      "TypeScript",
      "Redux Toolkit / Zustand",
      "React Query (TanStack)",
      "Tailwind CSS",
      "Shadcn/UI & Radix UI",
      "Material UI",
    ],
  },
  {
    title: "Backend Development",
    icon: FiServer,
    skills: [
      "Python — Django, DRF, FastAPI",
      "C# — ASP.NET Core, EF Core, SignalR",
      "Node.js — Express.js, Socket.io",
      "REST API Design & Versioning",
      "JWT & OAuth 2.0 (RBAC)",
      "OpenAPI / Swagger",
    ],
  },
  {
    title: "Databases & Storage",
    icon: FaDatabase,
    skills: [
      "PostgreSQL",
      "MySQL & SQL Server",
      "MongoDB",
      "Redis (cache & sessions)",
      "Microsoft Dataverse",
      "Django ORM / EF Core / Mongoose",
    ],
  },
  {
    title: "AI / LLM Integration",
    icon: FaRobot,
    skills: [
      "Anthropic Claude API",
      "OpenAI API",
      "Vercel AI SDK",
      "LangChain (basics)",
      "Prompt Engineering",
      "Streaming responses (SSE)",
      "RAG & vector search fundamentals",
    ],
  },
  {
    title: "Cloud, DevOps & Tools",
    icon: FaGlobe,
    skills: [
      "Vercel",
      "AWS (EC2, S3)",
      "Docker & Docker Compose",
      "GitHub Actions CI/CD",
      "Azure DevOps (basics)",
      "Power Automate",
    ],
  },
  {
    title: "Practices & Workflow",
    icon: FiGitBranch,
    skills: [
      "Git / GitHub — GitFlow & PR reviews",
      "Agile / Scrum",
      "Responsive & Accessible (WCAG) UI",
      "Core Web Vitals",
      "Testing — Jest, RTL, xUnit, Pytest",
      "Code Reviews & Pair Programming",
    ],
  },
]

// --- Animation Variants ---
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

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly slower stagger for smoother feel
      delayChildren: 0.2, // Delay start of children animation after container appears
      ease: "easeOut",
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 }, // Start slightly lower and smaller
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for a refined pop
    },
  },
}

const footerTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.6, // Adjust delay based on number of cards + stagger
    },
  },
}


// --- The Component ---
const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Changed background to a subtle gradient */}
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is in view
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            {/* Added gradient text for premium feel */}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Core Competencies
            </span>
          </h2>
          <p className="mx-auto max-w-[750px] text-lg text-muted-foreground md:text-xl">
            Full stack expertise across frontend and backend technologies to build complete, scalable applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger earlier for grid container
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon // Get the icon component
            return (
              <motion.div key={index} variants={cardItemVariants} className="h-full">
                {/* Apply group class for internal hover effects */}
                <HoveringCard className="h-full group">
                  <Card className="flex h-full flex-col border border-border/20 transition-colors duration-300 group-hover:border-primary/40 bg-card/80 backdrop-blur-sm">
                    {/* Subtle backdrop blur for glassmorphism hint */}
                    <CardContent className="flex flex-1 flex-col items-center p-6 text-center md:p-8">
                      {/* Icon Styling */}
                      <div className="mb-5 rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                        <IconComponent className="h-8 w-8 text-primary" strokeWidth={1.5} />
                      </div>

                      {/* Category Title */}
                      <h3 className="mb-4 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {category.title}
                      </h3>

                      {/* Skills List */}
                      <ul className="mt-auto space-y-2.5 text-sm">
                        {category.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="text-muted-foreground">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </HoveringCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          variants={footerTextVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-muted-foreground">
             <FiStar className="h-4 w-4 text-primary/70" /> {/* Added subtle icon */}
             Continuously learning and adapting to new technologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills