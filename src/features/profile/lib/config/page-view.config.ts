import type { MaxWidthWrapperProps } from "@/components/ui/max-width-wrapper";
import type { SectionWrapperProps } from "@/components/ui/section-wrapper";

type PageViewConfig = {
  width: Pick<MaxWidthWrapperProps, "size">["size"];
  blockPadding: Pick<SectionWrapperProps, "paddingBlock">["paddingBlock"];
};

export const PAGE_VIEW_CONFIG: PageViewConfig = {
  width: "sm",
  blockPadding: "xs",
};
