"use client";

import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { LoadingPage } from "./loading-page";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [isClient, setIsClient] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  function handlePageClick(href: string) {
    startTransition(() => {
      router.push(href);
    });
  }

  const allPages = generatePagination(currentPage, totalPages);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient, setIsClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="flex px-2.5">
        <PaginationArrow
          direction="left"
          isDisabled={currentPage <= 1}
          handlePageClick={() =>
            handlePageClick(createPageURL(currentPage - 1))
          }
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                page={page}
                position={position}
                isActive={currentPage === page}
                handlePageClick={() => handlePageClick(createPageURL(page))}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          handlePageClick={() =>
            handlePageClick(createPageURL(currentPage + 1))
          }
          isDisabled={currentPage >= totalPages}
        />
      </div>
      {isPending &&
        createPortal(
          <LoadingPage className="bg-muted/40 fixed" />,
          document.body,
        )}
    </>
  );
}

function PaginationNumber({
  page,
  handlePageClick,
  isActive,
  position,
}: {
  page: number | string;
  handlePageClick: () => void;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = cn(
    "flex h-10 w-10 items-center justify-center text-sm border-b border-muted ",
    {
      "border-b-primary font-bold text-primary": isActive,
      "hover:bg-muted ": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={handlePageClick} className={className}>
      {page}
    </button>
  );
}

function PaginationArrow({
  handlePageClick,
  direction,
  isDisabled,
}: {
  handlePageClick: () => void;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = cn(
    "flex h-10 w-10 items-center justify-center rounded-full border",
    {
      "pointer-events-none text-gray-300 opacity-50": isDisabled,
      "hover:bg-card": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button onClick={handlePageClick} className={className}>
      {icon}
    </button>
  );
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
