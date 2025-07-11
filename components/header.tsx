"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResumeDownload } from "@/components/ResumeDownload"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [resumeText, setResumeText] = useState("CV")
  
  // Flip between CV and Resume every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setResumeText(prev => prev === "CV" ? "Resume" : "CV")
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "https://chatbot.imyousafzai.com/", label: "ChatBot" },
    { href: "https://banana.imyousafzai.com/", label: "Banana EA" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            <h1 className="bg-gradient-to-r from-primary/60 to-primary/20 bg-clip-text text-transparent">
              I M Yousafzai
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/* Resume Download with flipping text */}
            <div className="ml-2">
              <ResumeDownload
                variant="ghost"
                size="sm"
                showDropdown={true}
                label={resumeText}
                className="text-muted-foreground hover:text-primary transition-colors font-normal text-sm px-0 min-w-[80px] justify-center"
                showIcon={false}
              />
            </div>
          </nav>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Resume Download */}
            <div className="py-2">
              <ResumeDownload
                variant="ghost"
                size="sm"
                showDropdown={true}
                label={resumeText}
                className="text-muted-foreground hover:text-primary transition-colors font-normal text-sm justify-start px-0 min-w-[80px]"
                showIcon={false}
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
