import { cn } from "@/lib/utils";
import Link from "next/link";

type NavItem = { icon: React.ElementType; title: string; url: string };

type MobileNavProps = {
  nav: NavItem[];
  className?: string;
  isVisibleOnDesktop?: boolean;
};

export function MobileNav({
  nav,
  className,
  isVisibleOnDesktop = false,
}: MobileNavProps) {
  return (
    <nav
      className={cn("fixed right-0 bottom-0 left-0 mx-auto", {
        "md:hidden": !isVisibleOnDesktop,
        "max-w-md md:bottom-2": isVisibleOnDesktop,
      })}
    >
      <ul
        className={cn(
          "bg-background/20 grid backdrop-blur",
          {
            "md:rounded-lg": isVisibleOnDesktop,
          },
          className,
        )}
      >
        {nav.map(({ icon: Icon, title, url }) => (
          <li key={url}>
            <Link href={url}>
              <div className="flex flex-col items-center py-2">
                <div className="bg-foreground/10 mb-1 rounded-full p-2">
                  <Icon />
                </div>
                <span className="text-xs tracking-widest">{title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
