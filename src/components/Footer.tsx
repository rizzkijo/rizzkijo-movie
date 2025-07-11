import { cn } from "@/lib/utils";
import { useAppStore } from "../stores/themeStore";

const Footer = () => {
  const { footerCopyText } = useAppStore();
  return (
    <footer className="w-full bg-background mt-auto">
      <div className={cn(
        "text-sm font-[500] w-full container h-[60px]",
        "mx-auto flex items-center justify-center text-center px-4",
      )}>
        {footerCopyText}
      </div>
    </footer>
  );
};

export default Footer;
