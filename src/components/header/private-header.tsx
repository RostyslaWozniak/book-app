import { LogOutButton } from "@/features/auth/components/log-out-button";
import { AccessibleLink } from "../ui/accesible-link";
import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { getCurrentUser } from "@/features/auth/current-user";
import { Suspense } from "react";
import { Button } from "../shadcn-ui/button";
const navigation = [
  { label: "Główna", href: "/", ariaLabel: "Przejdź na główną" },
  { label: "Profil", href: "/profile", ariaLabel: "Przejdź do profilu" },
];

export function PrivateHeader() {
  return (
    <header className="w-screen bg-gray-50 py-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <nav>
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
        <div>
          <Suspense fallback={<div>Loading..</div>}>
            <LogoutButtonSuspense />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}

async function LogoutButtonSuspense() {
  const user = await getCurrentUser();
  return (
    <>
      {user ? (
        <LogOutButton>Wyloguj się</LogOutButton>
      ) : (
        <AccessibleLink href="/login" aria-label="Przejdź do logowania">
          <Button>Zaloguj się</Button>
        </AccessibleLink>
      )}
    </>
  );
}
