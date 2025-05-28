import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">I M Yousafzai (aka Immy)</h3>
              <p className="text-muted-foreground">FinTech and Web Developer</p>
            </div>

            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/immy2good" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/immy-yousafzai/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:imran@brumbyte.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 I M Yousafzai. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
