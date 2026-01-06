import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-current hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-400 dark:border-border w-12 h-12 focus:outline-none focus-visible:ring-0">
          <Sun className="!w-5 !h-5 rotate-0 text-gray-800 dark:text-white scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute !w-5 !h-5 rotate-90 text-gray-800 dark:text-white scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border border-gray-400 dark:border-border bg-gray-100 dark:bg-gray-900">
        <DropdownMenuItem className={theme === "light" ? "border border-violet-600 text-violet-600" : ""} onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className={theme === "dark" ? "border border-violet-600 text-violet-600" : ""} onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className={theme === "system" ? "border border-violet-600 text-violet-600" : ""} onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
