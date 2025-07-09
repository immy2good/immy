"use client";

import { ResumeDownload } from "./ResumeDownload";
import { downloadStaticResume, generateResumePDF, defaultResumeData } from "@/lib/resumeGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Printer } from "lucide-react";

export function ResumeDownloadExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Dropdown Menu
          </CardTitle>
          <CardDescription>
            Full featured download with multiple options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeDownload 
            variant="default" 
            size="lg" 
            showDropdown={true}
            label="Download Resume"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Simple Download
          </CardTitle>
          <CardDescription>
            Direct PDF download without menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeDownload 
            variant="outline" 
            size="default" 
            showDropdown={false}
            label="Get PDF"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Custom Actions
          </CardTitle>
          <CardDescription>
            Manual control over download methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={downloadStaticResume}
            className="w-full justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            Static PDF
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => generateResumePDF(defaultResumeData)}
            className="w-full justify-start"
          >
            <Printer className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => window.open('/cv/cv.pdf', '_blank')}
            className="w-full justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            View Online
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
