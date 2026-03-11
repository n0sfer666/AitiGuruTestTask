import type { FC } from "react";

import { RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppProviders } from "./providers";
import { router } from "./router";

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
