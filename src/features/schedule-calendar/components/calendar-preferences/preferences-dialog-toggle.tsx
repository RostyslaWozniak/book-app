import { Button } from "@/components/shadcn-ui/button";
import { SettingsIcon } from "lucide-react";
import { useCalendarPreferencesContext } from "./context/calendar-preferences-context";

export function PreferencesDialogToggle() {
  const { setIsOpen } = useCalendarPreferencesContext();
  return (
    <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
      <SettingsIcon className="min-h-5 min-w-5" />
    </Button>
  );
}
