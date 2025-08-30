import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { FormWrapper } from "@/features/auth/components/form-wrapper";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Logowanie",
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
            title="Logowanie do BookApp"
            error={error}
            showOAuthButtons
            link={{
              href: "/registration",
              label: "Nie masz jeszcze konta? Zarejestruj się!",
            }}
          >
            <SignInForm />
          </FormWrapper>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
