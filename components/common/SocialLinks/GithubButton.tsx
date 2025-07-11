"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

interface GithubButtonProps {
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

export function GithubButton({
  url = "https://github.com/immy2good",
  size = "icon",
  variant = "ghost",
}: GithubButtonProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
      >
        <GithubIcon className="h-6 w-6" />
        <span className="sr-only">GitHub</span>
      </a>
    </Button>
  );
}
