import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// The CV is one maintained PDF. Its source lives in the itradeaims-job-hunt repo (cv/cv.html).
const CV_PATH = "/cv/cv.pdf";

interface ResumeDownloadProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "sm" | "lg" | "default";
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export function ResumeDownload({
  variant = "secondary",
  size = "lg",
  className = "",
  showIcon = true,
  label = "Download CV",
}: ResumeDownloadProps) {
  return (
    <Button variant={variant} size={size} asChild className={`flex items-center gap-2 ${className}`}>
      <a href={CV_PATH} target="_blank" rel="noopener" download="Immy_Yousafzai_CV.pdf">
        {showIcon && <Download className="h-5 w-5" />}
        {label}
      </a>
    </Button>
  );
}
