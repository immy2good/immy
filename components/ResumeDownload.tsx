"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateResumePDF, defaultResumeData } from "@/lib/resumeGenerator";

interface ResumeDownloadProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "sm" | "lg" | "default";
  className?: string;
  showIcon?: boolean;
  label?: string;
  showDropdown?: boolean;
}

export function ResumeDownload({
  variant = "secondary",
  size = "lg",
  className = "",
  showIcon = true,
  label = "Download CV",
}: ResumeDownloadProps) {
  const handleDownload = () => {
    generateResumePDF(defaultResumeData);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      className={`flex items-center gap-2 ${className}`}
    >
      {showIcon && <Download className="h-5 w-5" />}
      {label}
    </Button>
  );
}
