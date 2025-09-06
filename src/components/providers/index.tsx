import { TRPCReactProvider } from "@/trpc/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>{children} </NuqsAdapter>
    </TRPCReactProvider>
  );
}
