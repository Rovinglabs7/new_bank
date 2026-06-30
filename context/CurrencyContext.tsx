"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Currency } from "@/config/pricing";

const STORAGE_KEY = "sprout_pricing_currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "GBP",
  setCurrency: () => undefined,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("GBP");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Currency | null;
      if (stored && (stored === "GBP" || stored === "EUR" || stored === "USD")) {
        setCurrencyState(stored);
      }
    } catch {
      // localStorage may be unavailable in some contexts
    }
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
