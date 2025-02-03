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
    <ReduxProvider>
      <html lang="en">
        <body>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
