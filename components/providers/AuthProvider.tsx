"use client";

import { useStorage } from "@/lib/helpers/manage-store";
import { useCallback, useEffect, useRef } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAccessToken, setAccessToken, removeAccessToken } = useStorage();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRefreshToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/get-refresh-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No refresh token available");
      }

      const data = await response.json();
      return data.refresh_token;
    } catch (error) {
      console.warn("Error fetching refresh token:", error);
      return null;
    }
  }, []);

  const refreshAuthToken = useCallback(async () => {
    const refreshToken = await fetchRefreshToken();
    if (!refreshToken) return;

    try {
      const response = await fetch("/api/auth/refresh-access-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      setAccessToken(data.access_token, { expires: 1 });

      // Schedule the next refresh after successful token update
      scheduleTokenRefresh();
    } catch (error) {
      console.error("Auth refresh failed:", error);
      removeAccessToken();
    }
  }, [fetchRefreshToken, setAccessToken, removeAccessToken]);

  const scheduleTokenRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    refreshTimeoutRef.current = setTimeout(refreshAuthToken, 55 * 60 * 1000);
  }, [refreshAuthToken]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      refreshAuthToken();
    } else {
      scheduleTokenRefresh();
    }

    return () => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, [getAccessToken, refreshAuthToken, scheduleTokenRefresh]);

  return <>{children}</>;
};

export default AuthProvider;
