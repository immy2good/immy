// Simple resume generator without external dependencies
// We'll use the browser's print functionality to create PDFs

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export const generateResumePDF = (data: ResumeData): void => {
  // Create a new window with the resume content
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    alert('Please allow pop-ups to download the resume');
    return;
  }

  const resumeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.personalInfo.name} - Resume</title>
      <style>
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.4;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #1e40af, #3730a3);
          color: white;
          padding: 40px 30px;
          margin: -20px -20px 30px -20px;
          border-radius: 0 0 15px 15px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header h1 {
          margin: 0;
          font-size: 2.8rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .header h2 {
          margin: 8px 0 0 0;
          font-size: 1.3rem;
          font-weight: 400;
          opacity: 0.95;
          letter-spacing: 0.5px;
        }
        .contact-info {
          margin-top: 20px;
          font-size: 0.95rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }
        .contact-info div {
          margin: 3px 0;
        }
        .section {
          margin: 25px 0;
        }
        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e40af;
          border-bottom: 3px solid #3b82f6;
          padding-bottom: 8px;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #1e40af);
        }
        .experience-item, .project-item {
          margin-bottom: 20px;
        }
        .job-title {
          font-weight: bold;
          font-size: 1.1rem;
          color: #1f2937;
        }
        .company-duration {
          color: #6b7280;
          font-style: italic;
          margin: 2px 0 8px 0;
        }
        .description ul {
          margin: 5px 0;
          padding-left: 20px;
        }
        .description li {
          margin: 3px 0;
        }
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          background: #e5e7eb;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.85rem;
          color: #374151;
        }
        .project-name {
          font-weight: bold;
          color: #1d4ed8;
          font-size: 1.05rem;
        }
        .project-tech {
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 5px;
        }
        .project-url {
          color: #3b82f6;
          font-size: 0.9rem;
          margin-top: 3px;
        }
        .summary-text {
          font-size: 1rem;
          line-height: 1.6;
          text-align: justify;
        }
        .download-btn {
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          margin: 20px 10px 20px 0;
          font-size: 1rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        .download-btn:hover {
          background: linear-gradient(135deg, #1e40af, #1e3a8a);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        .close-btn {
          background: #6b7280;
          margin-left: 10px;
        }
        .close-btn:hover {
          background: #4b5563;
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="download-btn" onclick="window.print()">📄 Download as PDF</button>
        <button class="download-btn close-btn" onclick="window.close()">✕ Close</button>
      </div>
      
      <div class="header">
        <h1>${data.personalInfo.name}</h1>
        <h2>${data.personalInfo.title}</h2>
        <div class="contact-info">
          <div>📧 ${data.personalInfo.email}</div>
          <div>📞 ${data.personalInfo.phone}</div>
          <div>📍 ${data.personalInfo.location}</div>
          <div>💼 ${data.personalInfo.linkedin}</div>
          <div>🔗 ${data.personalInfo.github}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary-text">${data.summary}</div>
      </div>

      <div class="section">
        <div class="section-title">Experience</div>
        ${data.experience.map(exp => `
          <div class="experience-item">
            <div class="job-title">${exp.title}</div>
            <div class="company-duration">${exp.company} | ${exp.duration}</div>
            <div class="description">
              <ul>
                ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
          ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Key Projects</div>
        ${data.projects.map(project => `
          <div class="project-item">
            <div class="project-name">${project.name}</div>
            <div>${project.description}</div>
            <div class="project-tech"><strong>Technologies:</strong> ${project.technologies.join(', ')}</div>
            ${project.url ? `<div class="project-url"><strong>URL:</strong> ${project.url}</div>` : ''}
          </div>
        `).join('')}
      </div>

      ${data.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${data.education.map(edu => `
            <div class="experience-item">
              <div class="job-title">${edu.degree}</div>
              <div class="company-duration">${edu.institution} | ${edu.year}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </body>
    </html>
  `;

  printWindow.document.write(resumeHTML);
  printWindow.document.close();
  
  // Auto-focus the new window
  printWindow.focus();
};

// Default resume data based on your profile
export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "I M Yousafzai",
    title: "Product Manager & Full-Stack Developer",
    email: "mr.imrankhan@gmail.com",
    phone: "+44 121 400 2972",
    location: "Birmingham, England, UK",
    linkedin: "linkedin.com/in/immy-yousafzai",
    github: "github.com/immy2good"
  },
  summary: "Product-minded technologist with 13+ years in fintech and web development, proven at leading cross-functional teams and delivering scalable, secure, user-centric applications (e-commerce, SaaS, full-stack). Seeking a role that blends software engineering and product leadership to tackle user-first challenges at scale.",
  experience: [
    {
      title: "Founder & Product Manager",
      company: "iTradeAIMS",
      duration: "2020 - Present",
      description: [
        "Built and launched comprehensive FinTech education platform serving 100K+ users globally",
        "Developed algorithmic trading systems and educational content for technical analysis",
        "Led product strategy, roadmap planning, and cross-functional team coordination",
        "Integrated Discord API and real-time data feeds for community-driven learning"
      ]
    },
    {
      title: "Full-Stack Developer & Consultant",
      company: "Various Clients",
      duration: "2010 - Present",
      description: [
        "Delivered 20+ responsive web applications using React, Next.js, and WordPress",
        "Built e-commerce solutions with WooCommerce, Stripe integration, and custom features",
        "Developed MQL4/5 Expert Advisors and automated trading systems",
        "Implemented RESTful APIs, microservices architecture, and cloud deployments"
      ]
    }
  ],
  skills: [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "PHP", "WordPress", "WooCommerce",
    "MQL4/5", "Pine Script", "PostgreSQL", "MongoDB", "AWS", "Docker", "Stripe Integration",
    "Technical Analysis", "Algorithmic Trading", "Product Management", "Agile/Scrum"
  ],
  projects: [
    {
      name: "iTradeAIMS FinTech Platform",
      description: "Comprehensive education platform with membership system, Discord integration, and real-time trading signals",
      technologies: ["WordPress", "MemberPress", "Discord API", "WebSockets", "Stripe"],
      url: "https://itradeaims.net"
    },
    {
      name: "The Banana EA",
      description: "Automated forex trading system with advanced risk management and 24/5 execution",
      technologies: ["MQL4", "MQL5", "MetaTrader", "C++", "Python"],
      url: "https://banana.imyousafzai.com"
    },
    {
      name: "TradingView Indicators",
      description: "Collection of technical analysis tools with 1.2K+ followers on TradingView platform",
      technologies: ["Pine Script", "API Integration", "WebHooks", "TradingView"],
      url: "https://www.tradingview.com/u/iTradeAIMS"
    }
  ],
  education: [
    {
      degree: "Self-taught Developer & Entrepreneur",
      institution: "Continuous Learning & Industry Experience",
      year: "2010 - Present"
    }
  ]
};

// Utility function for direct static PDF download
export const downloadStaticResume = async (): Promise<void> => {
  try {
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
    console.error('Static download failed, falling back to generated PDF:', error);
    // Fallback to dynamic generation
    generateResumePDF(defaultResumeData);
  }
};
