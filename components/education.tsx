"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, Award } from "lucide-react"
import { BackgroundGradient } from "@/components/ui/background-gradient"

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">My academic background and qualifications.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-background">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">University of Lahore</CardTitle>
                    <p className="text-muted-foreground">BS in Information and Engineering Technology (IET)</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>2022 - Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <span>Current CGPA: 3.84/4.00</span>
                    </div>
                    <p className="text-muted-foreground mt-4">
                      Focusing on web development, software engineering, and computer networks. Actively participating
                      in tech events and workshops to enhance practical skills.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </BackgroundGradient>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
