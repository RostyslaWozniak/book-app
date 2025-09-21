import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/shadcn-ui/drawer";
import { cn } from "@/lib/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";
import { buttonVariants } from "@/components/shadcn-ui/button";
import { type VariantProps } from "class-variance-authority";
import { useIsMobile } from "@/hooks/use-mobile";

type DialogProps = {
  children?: React.ReactNode;
  closeButton?: string;
  closeButtonVariant?: VariantProps<typeof buttonVariants>;
  contentClassName?: string;
  className?: string;
  description?: string;
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DialogWrapper = ({
  children,
  closeButton,
  closeButtonVariant = { variant: "outline", size: "default" },
  contentClassName,
  className,
  isOpen,
  setIsOpen,
  title,
  description = "",
}: DialogProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen} disablePreventScroll>
          <DrawerContent
            className={cn("overflow-y-scroll px-2.5", contentClassName)}
          >
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-xl">{title}</DrawerTitle>
              <DrawerDescription className="text-base">
                {description}
              </DrawerDescription>
            </DrawerHeader>
            {children}
            <DrawerFooter className="pt-2">
              {closeButton && (
                <DrawerClose
                  className={cn(
                    "w-full self-end justify-self-end",
                    buttonVariants(closeButtonVariant),
                  )}
                >
                  {closeButton}
                </DrawerClose>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            className={cn(
              "flex h-min max-h-[90vh] max-w-min min-w-100 flex-col sm:max-w-min",
              contentClassName,
            )}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className={cn("grow", className)}>
              {closeButton && (
                <DialogClose
                  className={cn(
                    "mr-2 self-end justify-self-end",
                    buttonVariants(closeButtonVariant),
                  )}
                >
                  {closeButton}
                </DialogClose>
              )}
              {children}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
