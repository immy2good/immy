"use client";

import { GithubButton } from "./GithubButton";
import { LinkedInButton } from "./LinkedInButton";
import { EmailButton } from "./EmailButton";

interface SocialLinksProps {
  className?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  emailName?: string;
  emailDomain?: string;
  emailTld?: string;
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
  emailName = "imran",
  emailDomain = "brumbyte",
  emailTld = "com",
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
      <EmailButton
        name={emailName}
        domain={emailDomain}
        tld={emailTld}
        variant={variant}
        size={size}
      />
    </div>
  );
}
