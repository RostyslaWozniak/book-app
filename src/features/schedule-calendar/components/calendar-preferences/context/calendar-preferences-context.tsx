import {
  createContext,
  use,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type CalendarPreferencesContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CalendarPreferencesContext =
  createContext<CalendarPreferencesContextType | null>(null);

export const CalendarPreferencesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CalendarPreferencesContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CalendarPreferencesContext.Provider>
  );
};

export const useCalendarPreferencesContext = () => {
  const context = use(CalendarPreferencesContext);

  if (context === null) {
    throw new Error(
      "CalendarPreferencesContext must be used within a CalendarPreferencesContextProvider",
    );
  }

  return context;
};
