"use client"
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, AuthLoading } from "convex/react";
import React from "react"; // Make sure to import React
import Loading from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({ children }) => {
  // Corrected: Added return statement here
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <Authenticated>
      {children}
    </Authenticated>

    <AuthLoading>
        <Loading />
    </AuthLoading>
    </ConvexProviderWithClerk>
  );
};
