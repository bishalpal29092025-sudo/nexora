"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";


export default function DemoPage() {
  const { userId } = useAuth();
  const [blockingLoading, setBlockingLoading] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);

  const handleBlocking = async () => {
    try {
      setBlockingLoading(true);

      const response = await fetch("/api/demo/blocking", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Blocking request failed");
      }

      console.log("Blocking request completed");
    } catch (error) {
      console.error("Blocking error:", error);
    } finally {
      setBlockingLoading(false);
    }
  };

  const handleBackground = async () => {
    try {
      setBackgroundLoading(true);

      const response = await fetch("/api/demo/background", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Background request failed");
      }

      console.log("Background job started");
    } catch (error) {
      console.error("Background error:", error);
    } finally {
      setBackgroundLoading(false);
    }
  };

  const handleClientError = () => {
    Sentry.logger.info("User attempting to click on client function", { userId })
    throw new Error("Client error: Something went wrong in the browser!");
  };

  const handleApiError = async () => {
    try {
      const response = await fetch("/api/demo/error", {
        method: "POST",
      });

      console.log("API error endpoint response:", response.status);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleInngestError = async () => {
    try {
      const response = await fetch("/api/demo/inngest-error", {
        method: "POST",
      });

      console.log("Inngest error endpoint response:", response.status);
    } catch (error) {
      console.error("Inngest request error:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-8">
      <Button
        disabled={blockingLoading}
        onClick={handleBlocking}
      >
        {blockingLoading ? "Loading..." : "Blocking"}
      </Button>

      <Button
        disabled={backgroundLoading}
        onClick={handleBackground}
      >
        {backgroundLoading ? "Starting..." : "Background"}
      </Button>

      <Button
        variant="destructive"
        onClick={handleClientError}
      >
        Client Error
      </Button>

      <Button
        variant="destructive"
        onClick={handleApiError}
      >
        API Error
      </Button>

      <Button
        variant="destructive"
        onClick={handleInngestError}
      >
        Inngest Error
      </Button>
    </div>
  );
}
