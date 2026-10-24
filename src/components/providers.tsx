"use client";

import { ClerkProvider, useAuth, UserButton } from "@clerk/nextjs";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "@/components/theme-provider";
import { UnauthenticatedView } from "@/features/auth/components/unauthenticated-view";
import { AuthLoadingView } from "@/features/auth/components/auth-loading-view";


const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error (
    "Missing NEXT_PUBLIC_CONVEX_URL environment variable"
  );
}

const convex = new ConvexReactClient(convexUrl);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          
          <Authenticated>
            <UserButton/>
            {children}
          </Authenticated>

          <Unauthenticated>
            <UnauthenticatedView/>
          </Unauthenticated>

          <AuthLoading>
            <AuthLoadingView/>
          </AuthLoading>

        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
