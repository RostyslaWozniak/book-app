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
    <header className="bg-muted py-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <nav>
          <ul className="hidden gap-x-4 md:flex">
            {navigation.map(({ ariaLabel, label, href }) => (
              <li key={href} className="hover:underline">
                <AccessibleLink href={href} aria-label={ariaLabel}>
                  {label}
                </AccessibleLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-x-2">
          <AccessibleLink href="/uslugi/nowa" aria-label="Przejdź do wizyt">
            <Button>Umów wizytę</Button>
          </AccessibleLink>
          <AccessibleLink href="/login" aria-label="Przejdź do logowania">
            <Button>Zaloguj się</Button>
          </AccessibleLink>

          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
