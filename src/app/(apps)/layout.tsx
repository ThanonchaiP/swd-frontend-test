"use client";

import { LanguageSwitcher } from "@/components/language-switcher";

import "@/i18n/config";

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <LanguageSwitcher />
      {children}
    </main>
  );
}
