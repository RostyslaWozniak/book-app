"use client";
import { $Enums } from "@prisma/client";
import { mapRoles } from "../../../lib/map-roles";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { Checkbox } from "@/components/shadcn-ui/checkbox";
import { ChevronDownIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

const dbRoles = [$Enums.Roles.ADMIN, $Enums.Roles.PROVIDER];

export function RoleSelection() {
  const [roles, setRoles] = useQueryState("roles", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSelectStatus(option: $Enums.Roles) {
    if (isPending) return;
    const lowerCaseOption = option.toLowerCase();
    startTransition(async () => {
      await setRoles((prev) =>
        prev
          ? prev.includes(lowerCaseOption)
            ? prev
                .split(":")
                .filter((el) => el !== lowerCaseOption)
                .join(":")
            : `${prev}:${lowerCaseOption}`
          : lowerCaseOption,
      );
      router.refresh();
    });
  }

  return (
    <Popover>
      <PopoverTrigger className="flex cursor-pointer items-center pl-2">
        Rola
        {isPending ? (
          <Loader className="ml-2 animate-spin" />
        ) : (
          <ChevronDownIcon className="ml-2" />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[180px] space-y-2 pb-2" align="start">
        {dbRoles.map((option, i) => (
          <div
            onClick={() => handleSelectStatus(option)}
            key={option}
            className={cn("cursor-pointer", {
              "border-b": i !== dbRoles.length - 1,
              "cursor-default opacity-60": isPending,
            })}
          >
            <Checkbox
              checked={roles
                ?.split(":")
                .map((role) => role.toUpperCase())
                .includes(option)}
            />
            <span className="ml-2">{mapRoles([option])}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
