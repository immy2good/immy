import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "iTradeAIMS",
      description:
        "A comprehensive FinTech education platform featuring advanced technical analysis tools, live Discord community, algorithmic trading signals, and Elliott Wave analysis. Built to help traders master technical analysis and reach their potential with expert guidance.",
      image: "/images/itradeaims-screenshot.jpg",
      technologies: ["React", "Node.js", "FinTech APIs", "Technical Analysis", "Real-time Data", "Elliott Wave"],
      liveUrl: "https://itradeaims.net/",
      githubUrl: "#",
    },
    {
      title: "TradingView Pine Script Indicators",
      description:
        "Collection of advanced Pine Script indicators and technical analysis tools published on TradingView. Features Elliott Wave analysis, custom oscillators, trend detection algorithms, and automated trading signals used by thousands of traders globally. 1.2K+ followers, 240+ published ideas.",
      image: "/images/tradingview-profile-screenshot.png",
      technologies: ["Pine Script", "Technical Analysis", "Elliott Wave", "TradingView", "Algorithmic Trading"],
      liveUrl: "https://www.tradingview.com/u/iTradeAIMS/",
      githubUrl: "https://www.tradingview.com/u/itradeaims-tv/",
    },
    {
      title: "Elliott Wave Analysis Tools",
      description:
        "Sophisticated Pine Script tools for Elliott Wave pattern recognition and analysis. Automated wave counting, Fibonacci retracement levels, and pattern validation systems. Based on my published book on Elliott Wave Principle available on Amazon.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Pine Script", "Elliott Wave Theory", "Pattern Recognition", "Fibonacci Analysis", "TradingView"],
      liveUrl: "https://www.tradingview.com/u/iTradeAIMS/",
      githubUrl: "https://amzn.eu/d/735UjWD",
    },
    {
      title: "MetaTrader Automation Bots",
      description:
        "Advanced MQL4 and MQL5 trading robots and expert advisors for MetaTrader platform. Automated trading systems covering forex, CFDs, and futures markets with sophisticated risk management and technical analysis integration.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["MQL4", "MQL5", "MetaTrader", "Algorithmic Trading", "Risk Management", "Forex"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Bewdley Farm Shop",
      description:
        "A complete e-commerce solution for a local farm shop featuring fresh produce delivery, online ordering system, and customer subscriptions. Showcases beautiful product photography and local delivery services.",
      image: "/images/bewdley-farmshop-screenshot.png",
      technologies: ["WordPress", "WooCommerce", "Bricks Builder", "PHP", "Stripe Integration"],
      liveUrl: "https://bewdleyfarmshop.co.uk/",
      githubUrl: "#",
    },
    {
      title: "Splashbacks Birmingham",
      description:
        "Professional website for UK's #1 rated splashback provider in the West Midlands. Features service showcase, consultation booking, and comprehensive product catalog for kitchen splashbacks and bespoke mirrors.",
      image: "/images/splashbacks-screenshot.png",
      technologies: ["WordPress", "Custom PHP", "Local SEO", "Contact Forms", "Gallery System"],
      liveUrl: "https://splashbacks.co/",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Featured FinTech & Web Projects</h2>

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
                        {project.liveUrl.includes("tradingview") ? "View Profile" : "Live Site"}
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {project.githubUrl.includes("amazon")
                          ? "View Book"
                          : project.githubUrl.includes("tradingview")
                            ? "Alt Profile"
                            : "Details"}
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
