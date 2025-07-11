"use client";

import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";

interface LinkedInButtonProps {
  url?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function LinkedInButton({
  url = "https://www.linkedin.com/in/immy-yousafzai/",
  size = "icon",
  variant = "ghost",
}: LinkedInButtonProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <LinkedinIcon className="h-6 w-6" />
        <span className="sr-only">LinkedIn</span>
      </a>
    </Button>
  );
}
