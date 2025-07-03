import { cn } from "../lib/utils";

const Footer = () => (
  <footer className="w-full bg-background mt-auto">
    <div className={cn(
      "text-sm font-[500] w-full container h-[60px]",
      "mx-auto flex items-center justify-center text-center px-4",
    )}>
      2025 &copy; Movie List App by rizzkijo.
    </div>
  </footer>
);

export default Footer;
