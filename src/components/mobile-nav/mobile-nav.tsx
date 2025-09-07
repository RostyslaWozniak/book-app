import { cn } from "@/lib/utils";
import Link from "next/link";

type NavItem = { icon: React.ElementType; label: string; href: string };

type MobileNavProps = {
  nav: NavItem[];
  className?: string;
};

export function MobileNav({ nav, className }: MobileNavProps) {
  return (
    <nav className="fixed right-0 bottom-0 left-0 md:hidden">
      <ul className={cn("bg-card/80 grid backdrop-blur", className)}>
        {nav.map(({ icon: Icon, label, href }) => (
          <li key={href}>
            <Link href={href}>
              <div className="flex flex-col items-center py-2">
                <div className="bg-foreground/20 mb-1 rounded-full p-2">
                  <Icon />
                </div>
                <span className="text-xs">{label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
