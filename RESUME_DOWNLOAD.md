# Resume Download Functionality

This portfolio includes a comprehensive PDF resume download system with multiple options for users.

## Features

### 1. **Multi-Option Download**
- **Static PDF Download**: Pre-generated PDF file served directly
- **Dynamic PDF Generation**: Browser-based PDF creation using print dialog
- **Online Viewing**: Direct PDF viewing in browser

### 2. **Flexible UI Components**
- **Dropdown Menu**: Full-featured button with multiple download options
- **Simple Button**: Direct download without menu options
- **Custom Implementation**: Manual control over download methods

## Components

### `ResumeDownload`
The main component that provides resume download functionality.

```tsx
import { ResumeDownload } from "@/components/ResumeDownload";

// Full dropdown with all options
<ResumeDownload 
  variant="default" 
  size="lg" 
  showDropdown={true}
  label="Download Resume"
/>

// Simple direct download
<ResumeDownload 
  variant="outline" 
  size="default" 
  showDropdown={false}
  label="Get PDF"
/>
```

#### Props
- `variant`: Button style ("default" | "outline" | "secondary" | "ghost")
- `size`: Button size ("sm" | "lg" | "default")
- `className`: Additional CSS classes
- `showIcon`: Whether to show download icon (default: true)
- `label`: Button text (default: "Download Resume")
- `showDropdown`: Whether to show dropdown menu (default: true)

### Utility Functions

```tsx
import { downloadStaticResume, generateResumePDF, defaultResumeData } from "@/lib/resumeGenerator";

// Download static PDF file
await downloadStaticResume();

// Generate dynamic PDF using browser print
generateResumePDF(defaultResumeData);
```

## API Route

The static PDF is served via Next.js API route at `/api/download/cv`:

- **Endpoint**: `GET /api/download/cv`
- **File Location**: `public/cv/cv.pdf`
- **Headers**: Proper PDF content type and download headers
- **Error Handling**: Graceful fallback to dynamic generation

## File Structure

```
├── components/
│   ├── ResumeDownload.tsx          # Main download component
│   └── ResumeDownloadExamples.tsx  # Usage examples
├── lib/
│   └── resumeGenerator.ts          # PDF generation logic
├── app/api/download/cv/
│   └── route.ts                    # Static PDF API route
└── public/cv/
    └── cv.pdf                      # Static PDF file
```

## How It Works

### Static Download Flow
1. User clicks download button
2. Fetch request to `/api/download/cv`
3. Server serves PDF file with proper headers
4. Browser triggers download
5. If fails, automatically falls back to dynamic generation

### Dynamic Generation Flow
1. Opens new browser window with formatted resume
2. Applies print-optimized CSS styles
3. User clicks "Download as PDF" button
4. Browser print dialog opens
5. User saves as PDF

### Responsive Design
- **Mobile**: Single column layout, optimized button sizes
- **Tablet**: Two column contact info, adjusted spacing
- **Desktop**: Full layout with professional styling

## Customization

### Resume Data
Update the `defaultResumeData` object in `lib/resumeGenerator.ts`:

```tsx
export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... more fields
  },
  // ... other sections
};
```

### Styling
The generated PDF uses embedded CSS for consistent formatting:
- **Colors**: Blue gradient theme matching the website
- **Typography**: Professional Arial font stack
- **Layout**: Clean, ATS-friendly design
- **Print Optimized**: Proper margins and page breaks

## Browser Compatibility

- **Modern Browsers**: Full functionality including dropdown menus
- **Older Browsers**: Graceful degradation to simple download
- **Mobile Safari**: Print functionality fully supported
- **Chrome/Firefox**: Optimal experience with all features

## Error Handling

- **File Not Found**: Automatic fallback to dynamic generation
- **Network Error**: User-friendly error messages
- **Pop-up Blocked**: Clear instructions for enabling pop-ups
- **API Failure**: Seamless fallback without user disruption

## Usage Examples

### In Hero Section
```tsx
<ResumeDownload 
  variant="secondary" 
  size="lg" 
  showDropdown={true}
  label="Download Resume"
/>
```

### In Header/Navigation
```tsx
<ResumeDownload 
  variant="ghost" 
  size="sm" 
  showDropdown={false}
  label="CV"
  className="text-sm"
/>
```

### Custom Implementation
```tsx
<Button onClick={downloadStaticResume}>
  <Download className="h-4 w-4 mr-2" />
  Quick Download
</Button>
```

This system provides a professional, reliable way for visitors to access your resume while maintaining excellent user experience across all devices and browsers.
