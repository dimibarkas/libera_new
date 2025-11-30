"use client";

import { useEffect, useState } from "react";

export function useAccessToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromStorage = window.localStorage.getItem("accessToken");
    if (fromStorage) {
      setToken(fromStorage);
      return;
    }
    const match = document.cookie.match(/accessToken=([^;]+)/);
    if (match) {
      setToken(decodeURIComponent(match[1]));
    }
  }, []);

  return token;
}
