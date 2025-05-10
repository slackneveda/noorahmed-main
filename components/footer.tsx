"use client"; // Keep this if needed for framer-motion hooks/components

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiMail, FiHeart } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// --- Instagram Icon Component (for consistency) ---
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props} // Pass className, etc.
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --- Social Links Data ---
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/slackneveda",
    Icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/noor-ahmed-1089311b4/",
    Icon: FaLinkedin,
  },
  {
    name: "Email",
    href: "mailto:slackneveda@gmail.com",
    Icon: FiMail,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/slack_neveda?igsh=OXN6YWlmYmJhem5k",
    Icon: FaInstagram,
  },
];

// Quick links for navigation
const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// --- Footer Component ---
const Footer = () => {
  // Animation Variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hover: {
      y: -3, // Subtle lift
      scale: 1.1, // Slight zoom
      transition: {
        type: "spring", // Smooth spring physics
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.footer
      className="border-t border-border/20 py-12 bg-background/80 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible" // Animate when footer enters viewport
      viewport={{ once: true, amount: 0.3 }} // Trigger once, when 30% visible
      variants={footerVariants}
    >
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* About Me Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">About Me</h3>
            <p className="text-sm text-muted-foreground">
              Passionate Full Stack Developer with expertise in creating modern, responsive web applications. I specialize in React, Next.js, and backend technologies with a focus on cybersecurity principles.
            </p>
            <p className="text-sm text-muted-foreground">
              Available for freelance work and collaborations. Let's build something amazing together!
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Feel free to reach out for projects, collaborations, or just to say hello!
            </p>
            <div className="flex items-center space-x-4 mt-2">
              {socialLinks.map(({ name, href, Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  target={name !== "Email" ? "_blank" : undefined} // Open non-email links in new tab
                  rel={name !== "Email" ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary" // Tailwind handles color
                  aria-label={`Visit Noor's ${name}`} // Enhanced accessibility
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Icon className="h-5 w-5" /> {/* Slightly larger icons on md+ */}
                  <span className="sr-only">{name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-5 border-t border-border/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Noor Ahmed. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 flex items-center mt-2 sm:mt-0">
            Made with <FiHeart className="h-3 w-3 mx-1 text-primary" /> in Pakistan
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;