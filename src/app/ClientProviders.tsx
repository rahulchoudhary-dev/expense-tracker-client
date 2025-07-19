"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import TanstackClientProvider from "./TanstackClientProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackClientProvider>
      <Toaster richColors position="top-center" duration={3000} />
      <ThemeProvider defaultTheme="dark" attribute="class" enableSystem>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </TanstackClientProvider>
  );
}
