"use client"

import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <Button onClick={scrollToTop} size="icon" variant="secondary" className="h-10 w-10 rounded-full shadow-lg">
            <ChevronUp className="h-5 w-5" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
