import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  href?: string;
  className?: string;
}

export function Button({ children, variant = "primary", href, className, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center text-sm tracking-wide transition-all duration-300 font-medium";

  const variants = {
    primary: "bg-beige text-navy hover:bg-white",
    secondary: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
    outline: "border border-navy text-navy hover:bg-navy hover:text-beige",
    ghost: "text-gold border-b border-gold hover:text-white hover:border-white",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
