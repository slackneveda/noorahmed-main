"use client";

import { useState, useEffect, useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX } from "react-icons/fi";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Link, Events, scrollSpy } from "react-scroll";
import Logo from "./logo";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

// --- Individual Dock Item Component ---
interface DockItemProps {
  to: string;
  name: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
  offset: number;
}

const DockItem: React.FC<DockItemProps> = ({ to, name, mouseX, isActive, offset }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // Calculate distance and map it to scale
  // Play with `stiffness` and `damping` for the spring effect
  const distance = useTransform(mouseX, (val) => {
    const bounds = itemRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Width determines the range of the effect
  // Scale = 1 when distance is far, Scale = maxScale (e.g., 1.5) when distance is 0
  const scale = useTransform(distance, [-80, 0, 80], [1, 1.5, 1], { // Adjust range [-80, 80] as needed
      clamp: true, // Prevents scaling below 1 or above 1.5
  });

  // Apply spring physics for smoother scaling
  const scaleSpring = useSpring(scale, {
      stiffness: 300,
      damping: 20,
      mass: 0.5, // Lighter mass for quicker response
  });

  return (
    <motion.div
      ref={itemRef}
      style={{ scale: scaleSpring }} // Apply the spring-animated scale
      className="relative" // Container to handle the scaling
    >
      <Link
        to={to}
        spy={true}
        smooth={true}
        offset={offset}
        duration={600}
        activeClass="text-primary font-semibold"
        className={`relative px-2 py-2 text-sm font-medium transition-colors duration-150 ease-out flex items-center justify-center cursor-none
         ${isActive ? 'text-primary font-semibold' : 'text-foreground/70 hover:text-foreground'}`}
      >
        <span className="relative z-10">{name}</span>

        {/* Optional: Active indicator dot (like macOS) */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator" // Animate layout changes
            className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

// --- Main Navbar Component ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mouseX = useMotionValue(Infinity); // Track mouse X relative to the nav container

  useEffect(() => {
    // Setup react-scroll events
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    
    // Initialize scrollSpy for automatic active state detection
    scrollSpy.update();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  // Calculate offset based on navbar height
  const getScrollOffset = () => {
    return isScrolled ? -70 : -80;
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20"> {/* Slightly taller desktop nav */}
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Logo />
          </motion.div>

          {/* Desktop Dock Navigation */}
          <motion.nav // Added motion.nav for semantic structure and potential animations
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.ul // This container tracks the mouse
              className="flex items-end space-x-1 bg-background/50 dark:bg-neutral-800/50 border border-border/30 rounded-full px-3 py-1 shadow-inner backdrop-blur-sm" // Dock styling
              onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
              onMouseLeave={() => mouseX.set(Infinity)} // Reset when mouse leaves
            >
              {navLinks.map((link) => (
                <li key={link.name}> {/* Wrap in li for semantic list */}
                    <DockItem
                      to={link.to}
                      name={link.name}
                      mouseX={mouseX}
                      isActive={activeSection === link.to}
                      offset={getScrollOffset()}
                    />
                </li>
              ))}
            </motion.ul>
          </motion.nav>

          {/* Right side controls (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 ml-4">
             <ModeToggle />
             {/* Optional: Add a CTA Button here if needed */}
             {/* <Button>Contact Me</Button> */}
          </div>


          {/* Mobile Menu Toggle & Mode Toggle */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={getScrollOffset()}
                  duration={600}
                  activeClass="text-primary bg-primary/10"
                  className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 cursor-none hover:text-primary hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;