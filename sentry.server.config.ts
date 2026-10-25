import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Enable performance tracing.
  // Consider a lower sampling rate in production.
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.2,

  // Limit collection of potentially sensitive data.
  dataCollection: {
    userInfo: false,
    graphQL: {
      document: false,
      variables: false,
    },
    genAI: {
      inputs: false,
      outputs: false,
    },
    databaseQueryData: false,
    queues: false,
    httpBodies: [],
    httpHeaders: {
      deny: ["forwarded", "-ip", "remote-", "via", "-user"],
    },
    cookies: {
      deny: ["forwarded", "-ip", "remote-", "via", "-user"],
    },
    urlQueryParams: {
      deny: ["forwarded", "-ip", "remote-", "via", "-user"],
    },
  },

  integrations: [
    Sentry.vercelAIIntegration(),
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error"],
    }),
  ],
});