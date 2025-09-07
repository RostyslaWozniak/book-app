import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ProviderProfileHeader } from "@/features/provider/components/provider-profile-header";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          <Suspense fallback={<SectionHeader title="Loading..." />}>
            <ProviderProfileHeader />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          <p>Next content on this page:</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
            voluptatem aliquam corporis tenetur voluptatibus hic nihil corrupti
            aperiam, deleniti culpa fugit laboriosam inventore, dolore esse amet
            rerum placeat debitis vero expedita. Commodi repellendus fugiat
            error quibusdam optio tempora dolor unde voluptatum ut, sit aperiam
            aliquid impedit ullam consequatur praesentium quas inventore? Saepe
            officiis enim magnam modi commodi temporibus odit fugit id, ex
            nesciunt ducimus asperiores autem illo a est beatae possimus ipsa ut
            ipsam dicta inventore hic dolor dolores. Quis tenetur, repellendus
            sint dignissimos eos porro asperiores similique rerum non ratione
            molestiae laudantium! Vel adipisci non accusantium odio minima quis!
          </p>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
