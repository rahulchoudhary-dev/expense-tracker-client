type StorageKey = "access_token" | "refresh_token" | "user" | string;

export const storage = {
  set: (key: StorageKey, value: any): void => {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  },

  get: <T = string>(key: StorageKey, parse = false): T | null => {
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
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
