"use client";

import Link from "next/link";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/shadcn-ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { HomeIcon } from "lucide-react";
import { unslugify } from "@/lib/utils/slugify";
import { uuidRegex } from "@/lib/utils/regex";

const PATH_MAPPINT = {
  admin: "Panel Administratora",
  appointments: "Wizyty",
  availability: "Dostępność",
  clients: "Klienci",
  edit: "Edytowanie",
  employees: "Specjalisci",
  login: "Logowanie",
  new: "Nowa",
  profile: "Profil",
  provider: "Panel specjalisty",
  registration: "Rejestracja",
  services: "Usługi",
  schedule: "Grafik",
};

export function Breadcrumb({
  startWith,
  pathMapping = PATH_MAPPINT,
}: {
  startWith?: string;
  pathMapping?: Record<string, string>;
}) {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const startPath = startWith ?? "/";
  const isCustomStart = startWith && startWith !== "/";

  let pathSegments: string[];
  let currentLink = "";

  if (isCustomStart) {
    const relativePath = pathname.startsWith(startWith)
      ? pathname.slice(startWith.length)
      : pathname;

    pathSegments = relativePath.split("/").filter((segment) => segment !== "");

    currentLink = startWith;
  } else {
    pathSegments = pathname.split("/").filter((segment) => segment !== "");
  }

  const crumbs = pathSegments.map((segment) => ({
    url: segment,
    label: unslugify(segment),
  }));

  return (
    <div className="relative">
      <ShadcnBreadcrumb className="scrollbar-hide overflow-x-auto">
        <BreadcrumbList className="w-full flex-nowrap px-4">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={startPath}
                className="flex items-center gap-x-2 text-nowrap"
                aria-label={
                  isCustomStart
                    ? `Przejdź do ${startPath}`
                    : "Przejdź do strony głównej"
                }
              >
                <HomeIcon />
                {isCustomStart &&
                  pathMapping?.[
                    unslugify(startPath.split("/").pop() ?? startPath)
                  ]}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {crumbs.map((crumb, index) => {
            currentLink += `/${crumb.url}`;
            const mappedLabel =
              pathMapping?.[crumb.label] ?? crumb.label ?? crumb.url;

            if (uuidRegex.test(crumb.url))
              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink asChild>
                      <Link
                        href={currentLink}
                        className="capitalize"
                        aria-label={`Przejdź do strony ${mappedLabel}`}
                      >
                        ...
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              );

            return (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                {index < crumbs.length - 1 ? (
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink asChild>
                        <Link
                          href={currentLink}
                          className="capitalize"
                          aria-label={`Przejdź do strony ${mappedLabel}`}
                        >
                          {mappedLabel}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="pr-4 text-nowrap capitalize">
                      {mappedLabel}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
      <div className="to-background absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent"></div>
    </div>
  );
}
