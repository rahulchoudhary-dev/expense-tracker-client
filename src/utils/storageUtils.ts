"use client";

type StorageKey = "access_token" | "refresh_token" | "user" | string;

export const storage = {
  set: (key: StorageKey, value: any): void => {
    if (typeof window === "undefined") return;
    const data = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  },

  get: <T = string>(key: StorageKey, parse = false): T | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return parse ? JSON.parse(data) : (data as unknown as T);
    } catch (e) {
      console.warn(`Failed to parse localStorage item for key: ${key}`);
      return null;
    }
  },

  remove: (key: StorageKey): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};
