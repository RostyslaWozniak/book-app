import { Button } from "@/components/shadcn-ui/button";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { getCurrentUser } from "@/features/auth/current-user";
import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function AdminProviderToggle({
  linkPath,
}: {
  linkPath: "admin" | "provider";
}) {
  return (
    <Suspense fallback={<Skeleton className="h-9 w-full" />}>
      <AdminProviderToggleButton linkPath={linkPath} />
    </Suspense>
  );
}

async function AdminProviderToggleButton({
  linkPath,
}: {
  linkPath: "admin" | "provider";
}) {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  if (!user.roles.includes("ADMIN") || !user.roles.includes("PROVIDER")) return;

  const isAdminPath = linkPath === "admin";
  return (
    <Link href={`/${linkPath}`}>
      <Button
        className="w-full overflow-hidden"
        variant={isAdminPath ? "default" : "secondary"}
      >
        {isAdminPath ? <ToggleRightIcon /> : <ToggleLeftIcon />}
        <span className="hidden w-40 @[100px]:block">{`Panel ${isAdminPath ? "Administratora" : "Specjalisty"}`}</span>
      </Button>
    </Link>
  );
}
