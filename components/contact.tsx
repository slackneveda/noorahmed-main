"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FiMail, FiPhone, FiSend } from "react-icons/fi"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import { Meteors } from "@/components/ui/meteors"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      message?: string
    } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fix the errors in the form.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission with delay for realistic effect
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <FiMail className="h-5 w-5" />,
      label: "Email",
      value: "slackneveda@gmail.com",
      href: "mailto:slackneveda@gmail.com",
    },
    {
      icon: <FiPhone className="h-5 w-5" />,
      label: "Phone",
      value: "+92 310 7005399",
      href: "tel:+92 310 7005399",
    },
    {
      icon: <FaGithub className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/slackneveda",
      href: "https://github.com/slackneveda",
    },
    {
      icon: <FaLinkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/noor-ahmed-1089311b4",
      href: "https://www.linkedin.com/in/noor-ahmed-1089311b4/",
    },
    {
      icon: <FaInstagram className="h-5 w-5" />,
      label: "Instagram",
      value: "instagram.com/slack_neveda",
      href: "https://www.instagram.com/slack_neveda?igsh=OXN6YWlmYmJhem5k",
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="h-full border overflow-hidden">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
              <Meteors number={20} />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full backdrop-blur-sm bg-card/50 border shadow-lg">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(errors.name && "border-destructive")}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(errors.email && "border-destructive")}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={cn(errors.message && "border-destructive")}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FiSend className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
