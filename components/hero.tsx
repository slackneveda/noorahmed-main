"use client"; // Necessary for hooks and event handlers

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { TypewriterEffect } from "@/components/ui/typewriter-effect"; // Verify this path is correct
import { BackgroundBeams } from "@/components/ui/background-beams"; // Verify this path is correct
import { Spotlight } from "@/components/ui/spotlight"; // Verify this path is correct
import { Link } from "react-scroll";
import Image from 'next/image';
import { useEffect, useState } from "react";

// --- Dot Pattern Background Component ---
const DotPattern = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <div className="absolute h-full w-full bg-[radial-gradient(var(--primary)/30%_2px,transparent_2px)] [background-size:24px_24px]" />
    </div>
  );
};

// --- Component ---
const Hero = () => {
  // --- Configuration ---
  const nameWords = [
    { text: "Hi,", className: "text-foreground/80" },
    { text: "I'm" },
    { text: "Noor", className: "text-primary" },
    { text: "Ahmed.", className: "text-primary" },
  ];

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer", // Shortened for better fit sometimes
    "Cybersecurity Enthusiast", // "Expert" is strong, maybe "Enthusiast"? Adjust as needed.
    "Digital Marketer", // Broader than just Google Ads
    "Entrepreneur",
  ];

  const tagline = "Crafting seamless, high-performance web applications with cutting-edge frontend and backend technologies.";
  const githubUrl = "https://github.com/slackneveda"; // IMPORTANT: Verify URL
  const linkedinUrl = "https://www.linkedin.com/in/noor-ahmed-1089311b4/"; // IMPORTANT: Verify URL
  const instagramUrl = "https://www.instagram.com/slack_neveda?igsh=OXN6YWlmYmJhem5k"; // IMPORTANT: Verify URL
  const profileImageUrl = "/noorbhai2.jpeg"; // IMPORTANT: Verify image exists at `public/noorbhai.jpeg`
  const cvUrl = "/Noor_Ahmed_CV.pdf"; // Latest CV in `public/`
  const cvFilename = "Noor-Ahmed-CV.pdf"; // Desired download filename

  // --- State for Role Cycling ---
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 4000); // Change role every 4 seconds (2s type + 2s pause approx) - Adjust as needed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [roles.length]);

  // Derive words for the current role for the TypewriterEffect
  const currentRoleWords = roles[roleIndex]
    .split(" ")
    .map((word) => ({
      text: word,
      // Consistent styling for role words
      className: "text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white",
    }));

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger children appearance
        delayChildren: 0.2,  // Start staggering after a small delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // Smoother easing
    },
  };

  // Variant for the cycling role title - allows separate timing if needed
  const roleTitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 1.0, // Delay slightly after name appears
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
  };


  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }, // Slightly different easing for pop
    },
  };

  // scrolling offset to account for navbar height
  const scrollOffset = -80;

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/10 py-16 md:py-24 lg:py-32"
    >
      {/* Premium Dot Pattern Background */}
      <DotPattern />
      
      {/* Subtle Background Effects */}
      <BackgroundBeams className="absolute left-0 top-0 h-full w-full -z-10 opacity-[0.08]" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary) / 0.15)" // Use primary color with low opacity
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 md:gap-x-16 gap-y-12 lg:grid-cols-2">
          {/* === Left Column: Text Content === */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8"
          >
            {/* Name Typewriter */}
            <motion.div variants={itemVariants}>
              <TypewriterEffect
                words={nameWords}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                cursorClassName="bg-primary ml-1 h-7 sm:h-9 md:h-11 lg:h-[3.25rem]" // Responsive cursor height
              />
            </motion.div>

            {/* Role Title (Cycling) - Fixed Height Container */}
            <motion.div
              variants={roleTitleVariants} // Use specific variants if needed for timing
              // CRITICAL: Fixed height to prevent layout shift
              // Adjust height values if longest role overflows at any screen size
              className="h-10 md:h-12 lg:h-14 w-full flex items-center justify-center lg:justify-start overflow-hidden"
            >
              <TypewriterEffect
                // CRITICAL: Add key to force re-render and restart animation
                key={roleIndex}
                words={currentRoleWords}
                // Adjusted text size within the fixed height container
                className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-center lg:text-left"
                cursorClassName="hidden" // Hide cursor for the role title to avoid clutter
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row pt-2"
            >
              <Button size="lg" className="group shadow-sm hover:shadow-md transition-shadow duration-300" asChild>
                <Link
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={scrollOffset}
                  duration={600}
                  className="cursor-none"
                >
                  View My Work
                  <FiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={scrollOffset}
                  duration={600}
                  className="cursor-none"
                >
                  Contact Me
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="group" asChild>
                <a href={cvUrl} download={cvFilename} className="cursor-none">
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-3 pt-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300" asChild>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300" asChild>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* === Right Column: Image === */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto order-first lg:order-last flex items-center justify-center mt-[-20px] md:mt-[-30px] lg:mt-[-40px]" // Added negative margin to move image up
          >
            {/* Optional decorative glow */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-lg opacity-70 animate-pulse"></div>

            {/* Image container - reserves space */}
            <div className="relative aspect-square w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden rounded-full border-2 border-primary/20 shadow-xl">
              <Image
                src={profileImageUrl}
                alt="Portrait of Noor Ahmed"
                fill // Makes image fill the container
                priority // Load this image eagerly as it's likely LCP
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px" // Helps browser select optimal image size
                className="object-cover" // Ensures image covers the area without distortion
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.0, duration: 0.8, ease: "easeOut" }} // Appear after main content animation
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20" // Fixed centering with transform
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={scrollOffset}
          duration={800}
          className="group inline-flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300 cursor-none"
        >
          <span className="mb-1 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }} // Subtle bounce animation
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <FiArrowDown className="h-5 w-5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;