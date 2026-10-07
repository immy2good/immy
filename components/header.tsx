"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResumeDownload } from "@/components/ResumeDownload";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Case Studies" },
    { href: "https://itradeaims.net/", label: "iTradeAIMS" },
    { href: "https://github.com/immy2good", label: "GitHub" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            <span className="bg-gradient-to-r from-primary/70 to-primary/30 bg-clip-text text-transparent">
              Immy Yousafzai
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <ResumeDownload
              variant="ghost"
              size="sm"
              label="CV"
              className="text-muted-foreground hover:text-primary transition-colors font-normal text-sm px-1"
              showIcon={false}
            />
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t space-y-2" aria-label="Mobile navigation">
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
            <div className="py-2">
              <ResumeDownload
                variant="ghost"
                size="sm"
                label="CV"
                className="text-muted-foreground hover:text-primary transition-colors font-normal text-sm justify-start px-0"
                showIcon={false}
              />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
