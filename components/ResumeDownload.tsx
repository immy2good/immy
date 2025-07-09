"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText, ChevronDown, Printer, ExternalLink } from "lucide-react";
import { generateResumePDF, defaultResumeData } from "@/lib/resumeGenerator";
import { useState } from "react";

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
  label = "Download Resume",
  showDropdown = true
}: ResumeDownloadProps) {
  
  const [isDownloading, setIsDownloading] = useState(false);

  const handleStaticDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/api/download/cv');
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Yousafzai_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to dynamic generation
      generateResumePDF(defaultResumeData);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDynamicDownload = () => {
    generateResumePDF(defaultResumeData);
  };

  if (!showDropdown) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        onClick={handleStaticDownload}
        disabled={isDownloading}
        className={`flex items-center gap-2 ${className}`}
      >
        {showIcon && <Download className={`h-5 w-5 ${isDownloading ? 'animate-bounce' : ''}`} />}
        {isDownloading ? 'Downloading...' : label}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`flex items-center gap-1 ${className}`}
        >
          {showIcon && <Download className="h-5 w-5" />}
          {label}
          <ChevronDown className={`h-3 w-3 ${size === 'sm' ? 'ml-0.5' : 'ml-1'} opacity-70`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleStaticDownload} disabled={isDownloading}>
          <FileText className="mr-2 h-4 w-4" />
          <span>{isDownloading ? 'Downloading...' : 'Download PDF (Static)'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDynamicDownload}>
          <Printer className="mr-2 h-4 w-4" />
          <span>Generate PDF (Print)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open('/cv/cv.pdf', '_blank')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View PDF Online</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
