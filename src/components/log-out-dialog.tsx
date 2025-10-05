"use client";

import { useState } from "react";
import { Button } from "./shadcn-ui/button";
import { LogOutIcon } from "lucide-react";
import { DialogWrapper } from "./ui/dialog-wrapper";
import { LogOutButton } from "@/features/auth/components/log-out-button";

export function LogoutDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <span className="hidden @[100px]:block">Wyloguj się</span>
        <LogOutIcon className="h-5 w-5" />
      </Button>
      <DialogWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Czy napewno chcesz wylogować się?"
      >
        <LogOutButton className="mt-4 w-full">Wyloguj się</LogOutButton>
      </DialogWrapper>
    </>
  );
}
