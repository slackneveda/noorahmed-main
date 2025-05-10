"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const FloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: "Quick Contact",
      description: "You can email me at slackneveda@gmail.com",
    })
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Button onClick={handleClick} size="lg" className="h-14 w-14 rounded-full shadow-lg">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Quick Contact</span>
        </Button>
      </motion.div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-16 right-0 bg-popover text-foreground p-2 rounded-md shadow-lg whitespace-nowrap"
        >
          Quick Contact
        </motion.div>
      )}
    </motion.div>
  )
}

export default FloatingButton
