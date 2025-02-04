import ReactQueryProvider from "@/providers/ReactQueryProvider";
// import global styles
import "@/app/globals.css";

import ReduxProvider from "@/lib/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
