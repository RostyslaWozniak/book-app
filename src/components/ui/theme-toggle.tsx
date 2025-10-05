"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/shadcn-ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
    >
      <Moon className="absolute scale-0 rotate-180 duration-300 dark:scale-100 dark:rotate-0" />
      <Sun className="absolute scale-100 rotate-0 duration-300 dark:scale-0 dark:-rotate-180" />
    </Button>
  );
}
