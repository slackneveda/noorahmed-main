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
                    {/* Restore GitHub and Live Demo buttons */}
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <Github size={16} /> GitHub
                      </a>
                    </Button>
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