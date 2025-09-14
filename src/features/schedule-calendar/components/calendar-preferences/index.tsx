"use client";

import { CalendarPreferencesContextProvider } from "./context/calendar-preferences-context";
import { PreferencesDialogToggle } from "./preferences-dialog-toggle";
import { PreferencesDialog } from "./preferences-dialog";

export function CalendarPreferences() {
  return (
    <CalendarPreferencesContextProvider>
      <PreferencesDialogToggle />
      <PreferencesDialog />
    </CalendarPreferencesContextProvider>
  );
}
