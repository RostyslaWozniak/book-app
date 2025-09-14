import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { useCalendarPreferencesContext } from "./context/calendar-preferences-context";
import { PreferencesForm } from "./preferences-form";

export function PreferencesDialog() {
  const { isOpen, setIsOpen } = useCalendarPreferencesContext();
  return (
    <>
      <DialogWrapper
        title="Ustawienia kalendara"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <PreferencesForm />
      </DialogWrapper>
    </>
  );
}
