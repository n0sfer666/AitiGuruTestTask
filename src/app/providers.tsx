import type { FC, ReactNode } from "react";

import { Toaster } from "react-hot-toast";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            fontSize: "0.875rem",
            fontFamily: "'Inter', -apple-system, sans-serif",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "0.75rem 1rem",
          },
          success: {
            style: {
              background: "#ffffff",
              color: "#1f2937",
              border: "1px solid #22c55e",
            },
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            style: {
              background: "#ffffff",
              color: "#1f2937",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      {children}
    </>
  );
};
