import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/theme-provider";
import { SidebarOpenProvider } from "./contexts/SidebarOpen";
import { AccessProvider } from "./contexts/AccessContext";
import { LoaderLgProvider } from "./contexts/LoadingContext";
import { Toaster } from "./components/ui/toaster";
import { UserProvider } from "./contexts/user-context";
import { queryClient } from "./lib/queryClient";
import { FormOpeningProvider } from "./contexts/FormOpening";
import { CommitteesProvider } from "./contexts/committee-context";
import MeetingProvider from "./contexts/MeetingProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { InboxProvider } from "./contexts/inbox-context";
type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Readonly<Props>) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <UserProvider>
            <CommitteesProvider>
              <MeetingProvider>
                <InboxProvider>

                <AccessProvider>
                  <SidebarOpenProvider>
                    <FormOpeningProvider>
                      <LoaderLgProvider>
                        {children}
                        <Toaster />
                      </LoaderLgProvider>
                    </FormOpeningProvider>
                  </SidebarOpenProvider>
                </AccessProvider>
                </InboxProvider>
              </MeetingProvider>
            </CommitteesProvider>
          </UserProvider>
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left"/> */}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default Providers;
