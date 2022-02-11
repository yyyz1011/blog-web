import { useEffect, useState } from "react";

const useLocalStorageState = (defaultValue: any, localStorageKey: string) => {
  const [value, setValue] = useState(() => {
    const itemValue = localStorage.getItem(localStorageKey);
    if (itemValue === null) return defaultValue;
    try {
      return JSON.parse(itemValue);
    } catch {
      return defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorageState;
