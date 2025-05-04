"use client";

import { Provider } from "react-redux";

import { HomeButton } from "@/components/home-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import store from "@/store/configureStore";

import "@/i18n/config";

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <main>
        <LanguageSwitcher />
        <HomeButton />
        {children}
      </main>
    </Provider>
  );
}
