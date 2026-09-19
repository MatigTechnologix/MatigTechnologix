"use client";

import { useEffect, useState } from "react";

export type CmsPublicRecord = { id: string; title: string; detail: string; status: string; updated: string };
type Store = Record<string, CmsPublicRecord[]>;
const storageKey = "matig-cms-lite-v1";

export function useCmsRecords(module: string, fallback: CmsPublicRecord[]) {
  const [records, setRecords] = useState<CmsPublicRecord[]>(fallback);
  useEffect(() => {
    const load = () => {
      try {
        const stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
        if (Array.isArray(stored[module])) setRecords(stored[module]);
      } catch { /* Keep the page fallback content. */ }
    };
    load();
    window.addEventListener("matig-cms-update", load);
    window.addEventListener("storage", load);
    return () => { window.removeEventListener("matig-cms-update", load); window.removeEventListener("storage", load); };
  }, [module]);
  return records;
}

export function publishCmsUpdate() { window.dispatchEvent(new Event("matig-cms-update")); }