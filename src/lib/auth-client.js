"use client";

import { useState, useEffect } from "react";

const listeners = new Set();
const notifyListeners = () => listeners.forEach((l) => l());

export const authClient = {
  useSession: () => {
    const [session, setSession] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let isMounted = true;

      const fetchSession = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const authUrl = `${baseUrl.replace(/\/pets$/, "")}/auth/me`;

          const res = await fetch(authUrl, {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (res.ok) {
            const userData = await res.json();
            if (isMounted) {
              setSession(userData);
              setError(null);
            }
          } else {
            if (isMounted) {
              setSession(null);
            }
          }
        } catch (err) {
          console.error("Error fetching user session:", err);
          if (isMounted) {
            setError(err);
            setSession(null);
          }
        } finally {
          if (isMounted) {
            setIsPending(false);
          }
        }
      };

      fetchSession();

      const handleUpdate = () => {
        fetchSession();
      };

      listeners.add(handleUpdate);
      return () => {
        isMounted = false;
        listeners.delete(handleUpdate);
      };
    }, []);

    return { data: session, isPending, error };
  },

  signIn: {
    email: async ({ email, password }) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/pets$/, "");
        const authUrl = `${baseUrl}/auth/login`;

        const res = await fetch(authUrl, {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          return {
            data: null,
            error: { message: data.message || "Invalid email or password." },
          };
        }

        notifyListeners();
        return { data, error: null };
      } catch (err) {
        return {
          data: null,
          error: { message: err.message || "Could not connect to the authentication server." },
        };
      }
    },
    social: async ({ provider, callbackURL }) => {
      const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/pets$/, "");
      const redirectUrl = `${baseUrl}/auth/social/${provider}?callbackURL=${encodeURIComponent(callbackURL)}`;
      window.location.href = redirectUrl;
      return {};
    },
  },

  signUp: {
    email: async ({ email, password, name, image }) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const authUrl = `${baseUrl.replace(/\/pets$/, "")}/auth/register`;

        const res = await fetch(authUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, image }),
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          return {
            data: null,
            error: { message: data.message || "Registration failed. Email might already be taken." },
          };
        }

        return { data, error: null };
      } catch (err) {
        return {
          data: null,
          error: { message: err.message || "Could not connect to the registration server." },
        };
      }
    },
  },

  signOut: async (options = {}) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const authUrl = `${baseUrl.replace(/\/pets$/, "")}/auth/logout`;

      await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      notifyListeners();

      if (options.fetchOptions?.onSuccess) {
        options.fetchOptions.onSuccess();
      }
      return { success: true };
    } catch (err) {
      console.error("Sign-out process encountered an error:", err);
      if (options.fetchOptions?.onSuccess) {
        options.fetchOptions.onSuccess();
      }
      return { error: err };
    }
  },
};
