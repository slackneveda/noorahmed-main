"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
// Replace Lucide React icons with React Icons
import { FaLightbulb, FaUsers } from "react-icons/fa";
import { FiBook, FiTarget } from "react-icons/fi";

// --- Data Definition for Traits (Cleaner Separation) ---
const personalTraits = [
  {
    title: "Strategic Problem-Solver",
    description: "I excel at dissecting complex challenges and architecting elegant, efficient solutions.",
    Icon: FaLightbulb, // Use component reference
  },
  {
    title: "Continuous Learner",
    description: "Passionate about staying current with emerging technologies and refining my skillset.",
    Icon: FiBook,
  },
  {
    title: "Meticulous Execution",
    description: "Believing details are paramount for polished design and valuable products.",
    Icon: FiTarget,
  },
  {
    title: "Collaborative Partner",
    description: "Thriving in team environments, fostering communication and shared success.",
    Icon: FaUsers,
  },
];

// --- Animation Variants (Optional but promotes reusability) ---
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const fadeInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay } },
});

// --- Component ---
const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Enhanced Background: Subtle Sparkles + Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        {/* Grid Layer */}
        <div className="absolute inset-0 h-full w-full dark:bg-grid-white/[0.08] bg-grid-black/[0.08]"></div>
        {/* Sparkles Layer - Adjusted for subtlety */}
        <SparklesCore
          id="aboutSparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={25} // Reduced density
          className="absolute inset-0 h-full w-full"
          particleColor="#a655ff" // Consider aligning with theme primary color if needed
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% visible
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-3">
            About Me
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
            Discover my journey, skills, and approach to crafting exceptional digital experiences.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Left Column: Narrative */}
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInLeft(0.2)} // Slight delay
            viewport={{ once: true, amount: 0.3 }}
          >
            <BackgroundGradient
              className="rounded-2xl p-6 sm:p-8 bg-background border border-border/50" // Added subtle border
              containerClassName="w-full h-full"
            >
              <h3 className="text-2xl font-semibold mb-5 text-primary">
                My Professional Journey
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over a year of dedicated experience as a full-stack developer, I specialize in building polished, high-performance, and responsive web applications. My frontend expertise encompasses modern HTML5, CSS3, and JavaScript, brought to life with React.js. I leverage Tailwind CSS and Bootstrap for rapid development and accessible, consistent styling.
                </p>
                <p>
                  On the backend, I utilize Python and Django to architect robust RESTful APIs, ensuring seamless integration with databases like MySQL and MongoDB. I prioritize reliability and efficiency throughout the development lifecycle. Rigorous API validation using tools like Insomnia, environment containerization with Docker, and streamlined deployments via Netlify or Vercel (leveraging global CDNs and automated CI/CD pipelines) are integral to my workflow.
                </p>
                <p>
                  My methodology is grounded in Git for version control, Agile principles for iterative development, and a commitment to delivering clean, well-documented, secure code that directly addresses user needs and business objectives.
                </p>
              </div>
              {/* Integrated Location/Availability */}
              <p className="mt-6 text-center text-sm font-medium text-muted-foreground/80">
                Based in Lahore | Available for Remote & On-site Opportunities
              </p>
            </BackgroundGradient>
          </motion.div>

          {/* Right Column: Traits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {personalTraits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial="initial"
                whileInView="animate"
                variants={fadeInUp(0.1 * index + 0.3)} // Staggered delay, starting after left column
                viewport={{ once: true, amount: 0.5 }}
              >
                {/* Enhanced Card Styling */}
                <Card className="group h-full transform transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 border border-border/50 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <trait.Icon className="h-9 w-9 mb-4 text-primary transition-colors duration-300" /> {/* Use Icon component */}
                    <h4 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {trait.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {trait.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;