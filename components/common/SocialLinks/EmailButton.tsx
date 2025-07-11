"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailButtonProps {
  name?: string;
  domain?: string;
  tld?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function EmailButton({
  name = "imran",
  domain = "brumbyte",
  tld = "com",
  size = "icon",
  variant = "ghost",
}: EmailButtonProps) {
  const handleEmailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${name}@${domain}.${tld}`;
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleEmailClick}
      aria-label="Contact via Email"
    >
      <Mail className="h-6 w-6" />
      <span className="sr-only">Email</span>
    </Button>
  );
}
