"use client";

import { Button } from "@/components/shadcn-ui/button";
import { oAuthSignIn } from "../actions/oauth-sign-in";
import { GoogleLogo } from "@/components/icons/google-logo";

export function OAuthButtons() {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={async () => await oAuthSignIn("google")}
        className="w-full"
        variant="outline"
      >
        <GoogleLogo /> Google
      </Button>
    </div>
  );
}
