import { Header } from "@/components";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen gap-4">
      <Header />
      <div>{children}</div>
    </div>
  );
}
