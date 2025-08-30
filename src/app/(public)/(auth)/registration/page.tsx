import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { FormWrapper } from "@/features/auth/components/form-wrapper";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejestracja",
};

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <FormWrapper
            title="Rejestracja do BookApp"
            error={error}
            showOAuthButtons
            link={{ href: "/login", label: "Masz już konto? Zaloguj się!" }}
          >
            <SignUpForm />
          </FormWrapper>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
