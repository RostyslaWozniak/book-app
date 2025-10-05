import { LogInIcon, PlusIcon } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import { AccessibleLink } from "../ui/accesible-link";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { ThemeToggle } from "../ui/theme-toggle";
const navigation = [
  { label: "Główna", href: "/", ariaLabel: "Przejdź na główną" },
  { label: "O nas", href: "/o-nas", ariaLabel: "Przejdź do strony o nas" },
  {
    label: "Kontakt",
    href: "/kontakt",
    ariaLabel: "Przejdź do strony kontakt",
  },
];

export function PublicHeader() {
  return (
    <header className="bg-card py-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <nav className="hidden md:block">
          <ul className="flex gap-x-4">
            {navigation.map(({ ariaLabel, label, href }) => (
              <li key={href} className="hover:underline">
                <AccessibleLink href={href} aria-label={ariaLabel}>
                  {label}
                </AccessibleLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-grow items-center justify-between gap-x-2 md:flex-grow-0">
          <AccessibleLink
            href="/uslugi/nowa"
            className="hidden md:flex"
            aria-label="Przejdź do umawiania wizyty"
          >
            <Button>
              Umów wizytę
              <PlusIcon />
            </Button>
          </AccessibleLink>
          <AccessibleLink
            href="/login"
            className="w-min sm:mx-0"
            aria-label="Przejdź do logowania"
          >
            <Button variant="secondary">
              Zaloguj się
              <LogInIcon />
            </Button>
          </AccessibleLink>
          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
