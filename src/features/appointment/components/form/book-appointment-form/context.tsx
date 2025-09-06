import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

type BookAppointmentFormContextType = {
  serviceId: string;
  providerSlug?: string;
  resetTimeField: () => void;
  isDateDialogOpen: boolean;
  setIsDateDialogOpen: Dispatch<SetStateAction<boolean>>;
  isTimeDialogOpen: boolean;
  setIsTimeDialogOpen: Dispatch<SetStateAction<boolean>>;
  watchDate: Date | undefined;
  nameInputRef: RefObject<HTMLInputElement | null>;
};

export const BookAppointmentFormContext =
  createContext<BookAppointmentFormContextType | null>(null);

export const useBookAppointmentFormContext = () => {
  const context = useContext(BookAppointmentFormContext);

  if (context === null) {
    throw new Error(
      "BookAppointmentFormContext must be used within a SessionProvider",
    );
  }

  return context;
};
