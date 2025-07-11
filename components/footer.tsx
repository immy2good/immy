import { SocialLinks } from "@/components/common/SocialLinks";

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

            <div>
              <SocialLinks spacing="tight" size="sm" />
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 I M Yousafzai. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
