import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Home, TrendingUp, Quote, User } from "lucide-react";

// Navigation bar component
function Navbar() {
  return (
    <nav className="bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-foreground">Tuff Reviews</h1>
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:text-primary"
                disabled
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:text-primary"
                disabled
              >
                <TrendingUp className="h-4 w-4" />
                Hot Artists
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:text-primary"
                disabled
              >
                <Quote className="h-4 w-4" />
                Best Verses
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-foreground hover:text-primary"
                disabled
              >
                <User className="h-4 w-4" />
                About Me
              </Button>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;