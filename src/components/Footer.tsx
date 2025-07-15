import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppStore } from "../stores/themeStore";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaLink } from "@react-icons/all-files/fa/FaLink";

const Footer = () => {
  const { footerCopyText, socialLinks } = useAppStore();
  return (
    <footer className="w-full bg-background mt-auto">
      <div className={cn(
        "text-sm font-[500] w-full container h-[60px] lg:h-[100px]",
        "mx-auto flex items-center justify-between text-center px-4",
      )}>
        <span>
          {footerCopyText}
        </span>
        <span className={cn(
          "flex items-center justify-center gap-4",
        )}>
          {socialLinks && socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              title={social.label}
              aria-label={`Go to ${social.label}`}
            >
              {social.label.toLowerCase() === 'instagram' ? (
                <FaInstagram size={20} />
              ) : social.label.toLowerCase() === 'linkedin' ? (
                <FaLinkedinIn size={20} />
              ) : (
                <FaLink size={20} />
              )}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
