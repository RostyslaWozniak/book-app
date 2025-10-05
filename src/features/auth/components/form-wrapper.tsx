import Link from "next/link";
import { OAuthButtons } from "./oauth-buttons";

type FormWrapperProps = {
  children: React.ReactNode;
  title: string;
  link?: {
    href: string;
    label: string;
  };
  showOAuthButtons?: boolean;
  description?: string;
  error?: string;
};

export const FormWrapper = ({
  children,
  title,
  description,
  error,
  link,
  showOAuthButtons = false,
}: FormWrapperProps) => {
  return (
    <div className="flex w-full">
      <div className="mx-auto w-full space-y-10 min-[500px]:max-w-md md:py-10">
        <div className="space-y-3">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground px-4 text-center text-sm md:text-base">
              {description}
            </p>
          )}
          {error && (
            <p className="text-destructive text-center text-sm md:text-base">
              {error}
            </p>
          )}
        </div>
        <div>
          {showOAuthButtons && (
            <>
              <OAuthButtons />
              <div className="my-6 flex items-center">
                <span className="bg-muted-foreground h-px flex-1" />
                <span className="text-muted-foreground px-2">lub</span>
                <span className="bg-muted-foreground h-px flex-1" />
              </div>
            </>
          )}
          {children}
          {link && (
            <div className="mt-6">
              <Link
                href={link.href}
                className="text-foreground/80 block text-center hover:underline"
              >
                {link.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
