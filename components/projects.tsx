"use client" // Required for hooks and event handlers

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Eye } from "lucide-react" // Added Eye icon for variety
import { Spotlight } from "@/components/ui/spotlight" // Assuming this is from Aceternity UI or similar
import Image from 'next/image' // Import Next.js Image component for optimization

// --- Data Configuration ---
// Consider moving to data/projects.js
const projects = [
  {
    title: "ECHL — AI Lending Portal",
    description:
      "Full-stack lending portal with an AI-powered chatbot for natural language loan queries. Customers can explore products, check eligibility, and get guided through the application via a real-time streaming chat (SSE) backed by FastAPI + Anthropic Claude and a PostgreSQL data layer.",
    image: "/echl.png",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Anthropic Claude"],
    demo: "https://lending-d4g4byg3fwesa0dx.centralus-01.azurewebsites.net/",
  },
  {
    title: "WORN — Enterprise Ticketing System",
    description:
      "Customized and extended Microsoft Dynamics 365 with automated ticket routing, SLA-based escalation, multi-status lifecycle tracking, and email workflows. Backed by C#/ASP.NET Core integration services exposing clean REST APIs and Power Automate flows.",
    image: "/worn.png",
    tags: ["C#", "ASP.NET Core", "Entity Framework Core", "Dynamics 365", "Dataverse", "Power Automate"],
    demo: "https://worn01-b7hncxgyc9etbwbu.centralus-01.azurewebsites.net/",
  },
  {
    title: "HSS — AI Operations & Prospecting Workspace",
    description:
      "Enterprise operations workspace with AI-powered prospecting runs, account discovery, lead review queue, opportunities pipeline, automations, and reports. Built with a Next.js dashboard UI on a C#/ASP.NET Core backend, surfacing real-time workspace metrics and quick-action workflows.",
    image: "/hss.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "C#", "ASP.NET Core", "AI Prospecting"],
    demo: "https://heae93-private-bcbmcchwgec3bmd5.centralus-01.azurewebsites.net/home",
  },
  {
    title: "Guestx — Team Performance Platform",
    description:
      "Full-stack business platform for measuring team effort, output, and performance through real-time call tracking, lead management, customer interaction timelines, and pipeline analytics. Next.js frontend consuming a C#/ASP.NET Core backend over REST APIs and SignalR for live updates.",
    image: "/guestx.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "C#", "ASP.NET Core", "SignalR", "Microsoft Dataverse"],
    demo: "https://v4.guestx.co/all-calls",
  },
  {
    title: "HealthSphere — Healthcare Platform",
    description:
      "Modern healthcare dashboard for clinicians featuring smart appointment scheduling, electronic health records, telemedicine video calls, prescriptions, secure messaging, and HIPAA-compliant workflows. Real-time priority alerts surface critical lab results at a glance.",
    image: "/healthsphere.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Healthcare", "HIPAA"],
    demo: "https://v0-healthcare-platform-design-lac.vercel.app/dashboard",
  },
  {
    title: "GlamourBloom — Beauty E-commerce",
    description:
      "Elegant beauty and skincare e-commerce storefront with curated category browsing (Skincare, Makeup, Haircare, Body, Sets), hero carousel, product search, cart, and a polished mobile-first responsive UI tuned for high-conversion product discovery.",
    image: "/glamor.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "E-commerce", "Responsive"],
    demo: "https://v0-glamour-bloom-website.vercel.app/",
  },
  {
    title: "CineVerse — Streaming Platform",
    description:
      "Netflix-inspired streaming experience with cinematic landing page, immersive hero artwork, browsable movie & TV catalogues, category filters, and a polished dark UI built for binge-friendly content discovery on any device.",
    image: "/cineverse.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Streaming", "Responsive"],
    demo: "https://v0-cine-verse-project.vercel.app/",
  },
  {
    title: "Sweet Treat Haven — Dessert E-commerce",
    description:
      "Boutique dessert e-commerce storefront with curated categories (Cakes & Pastries, Cookies, Frozen Desserts, Puddings, Small Bites, Pies & Tarts), rich hero, account/sign-in flow, and a warm, appetite-driven UI optimised for browsing and ordering on the go.",
    image: "/sweetheaven.png",
    tags: ["React", "Tailwind CSS", "E-commerce", "Responsive", "Netlify"],
    demo: "https://sweet-treat-haven.netlify.app/",
  },
  {
    title: "TaskMaster",
    description:
      "The simple, effective way to organize your tasks and boost productivity. A modern task management application with a clean UI, allowing users to manage their to-do lists efficiently.",
    image: "/task.png", // Using a placeholder - replace with actual screenshot
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "shadcn/ui"],
    github: "https://github.com/slackneveda/echo-todo-project",
    demo: "https://mytaskmasterio.netlify.app/",
  },
  {
    title: "ARJ PROFITS 1 Dollar Shop",
    description:
      "A full-featured e-commerce platform showcasing product browsing, detailed views, cart management, and a simulated secure checkout process, built with modern web technologies.",
    image: "/arj.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Stripe API"],
    github: "https://github.com/slackneveda",
    demo: "https://arjprofits.vercel.app/",
  },
  {
    title: "Bazario E-commerce",
    description:
      "A comprehensive e-commerce solution with intuitive product browsing, shopping cart functionality, user authentication, and seamless payment processing for a complete online shopping experience.",
    image: "/bazario.png", // Replace with actual screenshot if available
    tags: ["React", "Redux", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/slackneveda/bazario-ecommerce",
    demo: "https://earnest-fudge-5f5605.netlify.app/",
  },
  {
    title: "FriendNest",
    description:
      "A feature-rich social media platform that allows users to connect, share moments, and engage in real-time. FriendNest offers a beautiful, user-friendly environment for meaningful social interactions.",
    image: "/friendnest.png", // Replace with actual screenshot if available
    tags: ["React", "Firebase", "Socket.io", "Material UI", "Authentication", "Real-time"],
    github: "https://github.com/slackneveda/friendnest",
    demo: "https://friendnest.netlify.app/",
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
      staggerChildren: 0.15, // Stagger appearance of cards
      delayChildren: 0.2,
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Refined pop easing
    },
  },
}

// --- The Component ---
const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/15 to-background">
      {/* Spotlight Effect - Subtle and positioned */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-28"
        // Use a subtle color derived from your theme's primary color
        fill="hsl(var(--primary) / 0.1)"
      />

      {/* Main Content Container */}
      <div className="container px-4 md:px-6 relative z-10"> {/* Ensure content is above spotlight */}
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
              Featured Projects
            </span>
          </h2>
          <p className="mx-auto max-w-[750px] text-lg text-muted-foreground md:text-xl">
            A selection of projects demonstrating my skills and passion for building.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Start animation when 10% of grid is visible
          // Increased gap, adjusted columns for better spacing
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardItemVariants}
              className="flex" // Ensure motion div takes up flex space if needed
            >
              {/* Added group class for targeting hover effects from parent */}
              <Card className="flex flex-col h-full w-full overflow-hidden rounded-lg border border-border/30 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40 bg-card/90 backdrop-blur-sm group">
                {/* Image Container */}
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={project.image || "/images/placeholder.svg"} // Use placeholder if image missing
                    alt={`Screenshot of ${project.title}`}
                    fill // Use fill to cover the container
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" // Subtle scale on hover
                  />
                  {/* Optional: Overlay on hover */}
                  {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow p-6"> {/* Use flex-grow to push footer down */}
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-xl md:text-2xl line-clamp-1">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow mb-4"> {/* flex-grow here too */}
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
                    {/* Tags - placed lower for visual balance */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  {/* Footer with Buttons - Pushed to bottom */}
                  <CardFooter className="p-0 mt-auto flex gap-3">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          <Github size={16} /> GitHub
                        </a>
                      </Button>
                    )}
                    <Button variant="default" size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects