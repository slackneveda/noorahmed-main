"use client" // Required for Framer Motion hooks

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink, Award } from "lucide-react" // Added Award icon for variety
import { Button } from "@/components/ui/button"

// --- Data Configuration ---
// Consider moving to data/certificates.js
const certificates = [
  {
    id: "cisco-net-basics", // Added unique ID
    title: "Intro to Cybersecurity", // Shortened title slightly
    issuer: "Cisco Networking Academy", // More specific issuer
    date: "Issued 2023", // More descriptive date
    description:
      "Gained foundational knowledge of computer networking concepts, including TCP/IP protocols, subnetting strategies, and essential network security principles.",
    // IMPORTANT: Replace '#' with the actual verification link or omit the button if none exists
    link: "https://www.credly.com/badges/7dc767ea-03cf-4312-b818-ee2f6a7197d3/linked_in_profile", // Example verification link
    icon: FileText, // Assign specific icon
  },
  {
    id: "cisco-iot-intro",
    title: "Introduction to IoT",
    issuer: "Cisco",
    date: "Issued 2023",
    description:
      "Introductory knowledge of IoT and understanding how it enables Digital Transformation along with emerging technologies such as data analytics, AI/ML and cybersecurity. Understanding of Intent Based Networking to connect and secure billions of new devices.",
    link: "https://www.credly.com/badges/7bf754da-cfc8-437d-814d-9da2fbef242e/linked_in_profile", // Replace with actual verification link when available
    icon: FileText,
  },
  {
    id: "google-ads",
    title: "Google Ads Search Certification", // More specific title
    issuer: "Google",
    date: "Issued 2022",
    description:
      "Demonstrated proficiency in building, managing, and optimizing Google Search campaigns to achieve specific marketing objectives.",
    link: "https://skillshop.credential.net/2678331a-1bbd-45ab-b650-60e2cda8b6e5", // Example verification link
    icon: Award, // Use a different icon
  },
  {
    id: "enterpreship-cert",
    title: "Enterpreship Certification",
    issuer: "Enterprise Academy",
    date: "Issued 2023",
    description:
      "Comprehensive certification in entrepreneurship and business leadership, covering strategic planning, innovation management, and sustainable business practices.",
    link: "/entercertificate",
    icon: Award,
    isDownload: true, // Flag to indicate this should be downloaded
  },
  {
    id: "meta-version-control",
    title: "Version Control",
    issuer: "Meta",
    date: "Issued Jul 2025",
    description:
      "Completed Meta's Version Control course on Coursera, gaining hands-on proficiency with Git and GitHub workflows including branching, merging, pull requests, and collaborative software development practices.",
    link: "https://coursera.org/verify/0KMP9IPXCONT",
    icon: Award,
  },
  {
    id: "microsoft-power-platform",
    title: "Introduction to Microsoft Power Platform",
    issuer: "Microsoft",
    date: "Issued Jun 2025",
    description:
      "Completed Microsoft's Power Platform course on Coursera, covering Power BI, Power Apps, Power Automate, and Power Virtual Agents to build low-code business solutions and automate workflows.",
    link: "https://coursera.org/verify/1F9Z4HGKJDJM",
    icon: Award,
  },
  {
    id: "meta-advanced-react",
    title: "Advanced React",
    issuer: "Meta",
    date: "Issued Jul 2025",
    description:
      "Completed Meta's Advanced React course on Coursera, mastering hooks, custom components, JSX, advanced state management, performance optimization, and integrating React with REST and GraphQL APIs.",
    link: "https://coursera.org/verify/4STVBIG685UJ",
    icon: Award,
  },
  {
    id: "meta-html-css",
    title: "HTML and CSS in Depth",
    issuer: "Meta",
    date: "Issued Jul 2025",
    description:
      "Completed Meta's HTML and CSS in Depth course on Coursera, covering semantic HTML, responsive layouts, Flexbox, Grid, advanced CSS selectors, and modern web styling techniques.",
    link: "https://coursera.org/verify/5P7SLSA3BO3V",
    icon: FileText,
  },
  {
    id: "meta-ux-ui-design",
    title: "Principles of UX/UI Design",
    issuer: "Meta",
    date: "Issued Aug 2025",
    description:
      "Completed Meta's Principles of UX/UI Design course on Coursera, learning user research, wireframing, prototyping, accessibility, and design systems to create intuitive and engaging user experiences.",
    link: "https://coursera.org/verify/5O8D3T02Y18B",
    icon: Award,
  },
  {
    id: "ibm-prompt-engineering",
    title: "Generative AI: Prompt Engineering Basics",
    issuer: "IBM",
    date: "Issued Jul 2025",
    description:
      "Completed IBM's Prompt Engineering course on Coursera, mastering prompt design techniques, best practices, and tools to effectively interact with large language models and generative AI systems.",
    link: "https://coursera.org/verify/C7WAQSSR3ZEF",
    icon: Award,
  },
  {
    id: "scrimba-cursor-ai",
    title: "Vibe Coding with Cursor AI",
    issuer: "Scrimba",
    date: "Issued Jun 2025",
    description:
      "Completed Scrimba's Vibe Coding with Cursor AI course on Coursera, gaining practical skills in AI-assisted development workflows, prompt-driven coding, and leveraging Cursor AI to accelerate software delivery.",
    link: "https://coursera.org/verify/ENGAVNNMQF0C",
    icon: Award,
  },
  {
    id: "microsoft-dynamics-365",
    title: "Introduction to Microsoft Dynamics 365",
    issuer: "Microsoft",
    date: "Issued Jun 2025",
    description:
      "Completed Microsoft's Dynamics 365 course on Coursera, covering CRM and ERP fundamentals, business applications, and how Dynamics 365 streamlines sales, customer service, and operations.",
    link: "https://coursera.org/verify/G6OQURR0AX0E",
    icon: Award,
  },
  {
    id: "meta-javascript",
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "Issued Jun 2025",
    description:
      "Completed Meta's Programming with JavaScript course on Coursera, mastering core JavaScript concepts including variables, functions, objects, DOM manipulation, asynchronous programming, and test-driven development.",
    link: "https://coursera.org/verify/P5FK00F1T6F9",
    icon: Award,
  },
  {
    id: "deeplearning-genai-everyone",
    title: "Generative AI for Everyone",
    issuer: "DeepLearning.AI",
    date: "Issued Jul 2025",
    description:
      "Completed Andrew Ng's Generative AI for Everyone course on Coursera, gaining a strong understanding of how generative AI works, real-world applications, lifecycle of AI projects, and responsible AI use.",
    link: "https://coursera.org/verify/Q1NFNXCZSMF6",
    icon: Award,
  },
  {
    id: "meta-frontend-intro",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "Issued Jun 2025",
    description:
      "Completed Meta's Introduction to Front-End Development course on Coursera, building a solid foundation in HTML, CSS, responsive design, Bootstrap, and the modern front-end development ecosystem.",
    link: "https://coursera.org/verify/S2YC4YWVJ4W7",
    icon: FileText,
  },
  {
    id: "meta-react-basics",
    title: "React Basics",
    issuer: "Meta",
    date: "Issued Jul 2025",
    description:
      "Completed Meta's React Basics course on Coursera, learning to build interactive single-page applications with React components, props, state, hooks, and routing.",
    link: "https://coursera.org/verify/T8NDL4YWUEL3",
    icon: Award,
  },
  {
    id: "deeplearning-ai-everyone",
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "Issued Jul 2025",
    description:
      "Completed Andrew Ng's AI For Everyone course on Coursera, gaining a non-technical overview of AI strategy, machine learning workflows, organizational AI adoption, and the ethical implications of AI.",
    link: "https://coursera.org/verify/WP8GT55FJOKF",
    icon: Award,
  },
  // Add more certificates here...
]

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }, // Smooth stagger
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }, // Refined ease
  },
}


// --- The Component ---
const Certificates = () => {
  return (
    <section id="certificates" className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Credentials & Certifications
            </span>
          </h2>
          <p className="mx-auto max-w-[750px] text-lg text-muted-foreground md:text-xl">
            Recognized achievements and completed professional development courses.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" // Increased gap and max-width
        >
          {certificates.map((cert) => {
             const IconComponent = cert.icon; // Get the icon component
             const hasValidLink = cert.link && cert.link !== "#"; // Check if link is valid

             return (
                <motion.div
                  key={cert.id} // Use unique ID for key
                  variants={cardItemVariants}
                  className="flex" // Ensure motion div takes up flex space
                >
                  <Card className="group flex h-full w-full flex-col rounded-lg border border-border/30 bg-card/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-start gap-4 p-6 pb-4"> {/* Adjusted padding */}
                      {/* Icon Container */}
                      <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                        <IconComponent className="h-6 w-6 text-primary" strokeWidth={1.5}/>
                      </div>
                      {/* Title and Meta */}
                      <div className="flex-grow">
                        <CardTitle className="text-lg md:text-xl font-semibold leading-tight">{cert.title}</CardTitle>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                           <Badge className="text-xs font-medium">{cert.issuer}</Badge>
                           <span className="text-xs text-muted-foreground">{cert.date}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col p-6 pt-2"> {/* Use flex-grow to push button down */}
                       <p className="flex-grow text-sm text-muted-foreground leading-relaxed mb-4">{cert.description}</p>
                       {/* Verification Button - Conditionally Rendered */}
                       {hasValidLink && (
                         <Button
                           className="mt-auto w-fit group/button" // mt-auto pushes button down, w-fit shrinks it
                           asChild
                         >
                            <a
                                href={cert.link}
                                target={cert.isDownload ? "_self" : "_blank"}
                                rel={cert.isDownload ? "" : "noopener noreferrer"}
                                download={cert.isDownload ? "enterpreship-certificate.pdf" : undefined}
                                aria-label={`${cert.isDownload ? "Download" : "View"} certificate for ${cert.title} from ${cert.issuer}`}
                            >
                                <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/button:scale-110" />
                                {cert.isDownload ? "Download Certificate" : "Verify Credential"}
                            </a>
                         </Button>
                       )}
                    </CardContent>
                  </Card>
                </motion.div>
             )
           })}
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates