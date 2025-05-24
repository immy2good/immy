import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "iTradeAIMS",
      description:
        "A comprehensive trading education platform featuring live Discord community, entry signals, and stress-free trading strategies. Built to help traders reach their potential with expert guidance.",
      image: "/images/itradeaims-screenshot.jpg",
      technologies: ["React", "Node.js", "Discord Integration", "Payment Processing", "Real-time Data"],
      liveUrl: "https://itradeaims.net/",
      githubUrl: "#",
    },
    {
      title: "Bewdley Farm Shop",
      description:
        "A fully functional e-commerce website for a local farm shop featuring online ordering, product catalog, and secure checkout. Built with modern WordPress architecture.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["WordPress", "WooCommerce", "Bricks Builder", "PHP", "Stripe Integration"],
      liveUrl: "https://bewdleyfarmshop.co.uk/",
      githubUrl: "#",
    },
    {
      title: "Splashbacks Birmingham",
      description:
        "Professional website for a local Birmingham splashback installation business, featuring service showcase, gallery, and customer contact forms.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["WordPress", "Custom PHP", "Local SEO", "Contact Forms", "Gallery System"],
      liveUrl: "https://splashbacks.co/",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Featured Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} website screenshot`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Site
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Details
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
