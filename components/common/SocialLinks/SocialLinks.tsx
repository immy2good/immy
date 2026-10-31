"use client";

import { GithubButton } from "./GithubButton";
import { LinkedInButton } from "./LinkedInButton";

interface SocialLinksProps {
  className?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  spacing?: "tight" | "normal" | "wide";
}

export function SocialLinks({
  className = "",
  githubUrl = "https://github.com/immy2good",
  linkedInUrl = "https://www.linkedin.com/in/immy-yousafzai/",
  variant = "ghost",
  size = "icon",
  spacing = "normal",
}: SocialLinksProps) {
  const getSpacingClass = () => {
    switch (spacing) {
      case "tight":
        return "space-x-2";
      case "normal":
        return "space-x-6";
      case "wide":
        return "space-x-8";
      default:
        return "space-x-6";
    }
  };

  return (
    <div className={`flex justify-center ${getSpacingClass()} ${className}`}>
      <GithubButton url={githubUrl} variant={variant} size={size} />
      <LinkedInButton url={linkedInUrl} variant={variant} size={size} />
    </div>
  );
}
